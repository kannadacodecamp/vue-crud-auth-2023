<script setup lang="ts">
import { RouterView } from "vue-router";
import NavbarComp from "./components/NavbarComp.vue";
</script>

<template>
  <NavbarComp />
  <div class="container">
    <div class="row">
      <RouterView />
    </div>
  </div>
</template>
