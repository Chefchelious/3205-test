<template>
  <div class="user-info">
    <p>{{ user.email }}</p>
    <p>{{ user?.number }}</p>
  </div>
</template>

<script setup lang="ts">
import type {IUser} from "@common/interfaces/types";

defineProps<{
  user: IUser
}>()
</script>

<style scoped>
.user-info+.user-info {
  margin-top: 16px;
}
</style>
