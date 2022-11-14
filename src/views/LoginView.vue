<script setup lang="ts">
import { ref } from "vue";
import { object, string } from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const loginFormSchema = object({
  email: string().email().required(),
  password: string().min(4).max(10).required(),
});

const values = ref({ email: "", password: "" });
const errors = ref({ email: "", password: "" });

const router = useRouter();
const authStore = useAuthStore();

const loginUser = async () => {
  try {
    const res = await loginFormSchema.validate(values.value, {
      abortEarly: false,
    });
    authStore.loginUser(res).then(() => {
      router.push({ name: "users" });
    });
  } catch (error) {
    error.inner.forEach((e) => {
      errors.value[e.path] = e.message;
    });
  }
};

const validate = async (field) => {
  try {
    await loginFormSchema.validateAt(field, values.value);
    errors.value[field] = "";
  } catch (error) {
    errors.value[error.path] = error.message;
  }
};
</script>
<template>
  <div class="col-md-6 mx-auto py-4">
    <h2>Login</h2>
    <br />
    <form @submit.prevent="loginUser">
      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          v-model="values.email"
          class="form-control"
          @validate="validate('email')"
          @input="$emit('input', $event.target.value)"
          @blur="$emit('validate')"
          @keypress="$emit('validate')"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text" v-if="!!errors.email">
          {{ errors.email }}
        </div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="values.password"
          class="form-control"
          @validate="validate('password')"
          @input="$emit('input', $event.target.value)"
          @blur="$emit('validate')"
          @keypress="$emit('validate')"
          aria-describedby="passwordHelp"
        />
        <div id="passwordHelp" class="form-text" v-if="!!errors.password">
          {{ errors.password }}
        </div>
      </div>
      <!-- Submit -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br />
    <p>New user? <router-link to="/register">register here</router-link></p>
  </div>
</template>
