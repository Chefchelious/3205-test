<template>
  <form @submit.prevent="fetchUsers" class="wrapper">
    <div class="input-wrapper">
      <input
        v-model="data.email"
        class="form-input"
        type="text"
        placeholder="email"
        :class="{ 'input-error': emailError }"
      >
      <p v-if="emailError" class="error-message">{{ emailError }}</p>
    </div>
    <div class="input-wrapper">
      <input
        v-model="data.number"
        class="form-input"
        type="text"
        placeholder="number"
        :class="{ 'input-error': numberError }"
        v-mask="'##-##-##'"
      >
      <p v-if="numberError" class="error-message">{{ numberError }}</p>
    </div>
    <button class="btn" type="submit">get users</button>
  </form>
</template>

<script setup lang="ts">
import axiosApi from "@/axiosApi";
import type {IUser} from "@common/interfaces/types";
import {AxiosError} from "axios";
import {reactive, ref} from "vue";

const emit = defineEmits(['update-user-list'])

const data = reactive<IUser>({
  email: '',
  number: ''
})

const emailError = ref<string | null>(null);
const numberError = ref<string | null>(null);

const abortController = ref<AbortController | null>(null);

const validateEmail = () => {
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    emailError.value = 'Invalid email';
  } else {
    emailError.value = null;
  }
};

const validateNumber = () => {
  const rawNumber = (data.number ?? '').replace(/-/g, '');

  if (rawNumber && !/^\d{6}$/.test(rawNumber)) {
    numberError.value = 'Length of numbers must be 6';
  } else {
    numberError.value = null;
  }
};

const formValidator = () => {
  validateEmail()
  validateNumber()
}

const fetchUsers = async () => {
  try {
    formValidator()

    if (emailError.value || numberError.value) return

    if (abortController.value) {
      abortController.value.abort();
    }

    const controller = new AbortController();
    abortController.value = controller;

    const result = await axiosApi.post<IUser[]>('/search-user',
      {...data, number: (data.number ?? '').replace(/-/g, '')},
      {
        signal: controller.signal
      }
    )
    emit('update-user-list', result.data)
  } catch (e) {
    if (e instanceof AxiosError && e.message === 'canceled') {
      console.log('canceled');
    } else {
      console.error('fetchUsers', e);
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
}

.form-input, .btn {
  padding: 4px;
}

.btn {
  background: blue;
  color: white;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
}

.btn:active {
  background: #0077ff;
}

.btn:disabled {
  background: rgba(0, 119, 255, 0.63);
}

.input-error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
