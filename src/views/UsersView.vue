<template>
  <div class="col-md-4 mx-auto" v-for="user in authStore.users" :key="user.id">
    <div class="card m-4">
      <img :src="user.avatar" class="card-img-top" :alt="user.email" />
      <div class="card-body">
        <h5 class="card-title">{{ user.email }}</h5>
        <p class="card-text">
          {{ `${user.first_name} ${user.last_name}` }}
        </p>
      </div>
      <div class="d-flex justify-content-around pb-3">
        <button class="btn btn-info" @click="editUser(user.id)">Edit</button>
        <button class="btn btn-danger" @click="deleteUser(user.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
onMounted(() => {
  authStore.listUsers();
});

const editUser = (e: number) => {
  authStore.editUser(e);
};
const deleteUser = (e: number) => {
  authStore.deleteUser(e);
};
</script>
