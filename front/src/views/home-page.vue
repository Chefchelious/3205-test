<template>
  <main>
    <user-form @update-user-list="updateUserList" />

    <user-list :user-list="userList" />
  </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type { IUser } from '@common/interfaces/types'
import UserForm from "@/components/user-form.vue";
import UserList from "@/components/user-list.vue";

const userList = ref<IUser[]>([])

const updateUserList = (usersData: IUser[]) => {
  userList.value = usersData
}
</script>

<style scoped>
</style>
