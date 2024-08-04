<template>
  <div class="wrapper">
    <h2>User list</h2>

    <user-info v-if="userList.length" v-for="(user, idx) in userList" :key="idx" :user="user" />
    <span v-else>no results...</span>
  </div>
</template>

<script setup lang="ts">
import type {IUser} from "@common/interfaces/types";
import UserInfo from "@/components/user-info.vue";

defineProps<{
  userList: IUser[]
}>()
</script>
