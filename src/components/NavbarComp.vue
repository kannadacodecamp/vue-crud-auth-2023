<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#"> Interview </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">USERS</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button
            class="btn btn-danger"
            v-if="authStore.isAuthenticated"
            @click="authStore.logoutUser()"
          >
            LOGOUT
          </button>
          <router-link
            class="btn btn-success"
            v-if="!authStore.isAuthenticated"
            to="/login"
            >LOGIN</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
</script>
