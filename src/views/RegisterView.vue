<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { object, string } from "yup";
import { useAuthStore } from "../stores/auth";

const registerFormSchema = object({
  email: string().email().required(),
  password: string().min(4).max(8).required(),
});

const values = ref({ email: "", password: "" });
const errors = ref({ email: "", password: "" });

const authStore = useAuthStore();
const router = useRouter();

const registerUser = async () => {
  try {
    const res = await registerFormSchema.validate(values.value, {
      abortEarly: false,
    });

    const payload = {
      email: res.email,
      password: res.password,
    };
    authStore.registerUser(payload).then(() => {
      router.push({ name: "dashboard" });
    });
  } catch (error) {
    error.inner.forEach((e) => {
      errors.value[e.path] = e.message;
    });
  }
};

const validate = async (field) => {
  try {
    await registerFormSchema.validateAt(field, values.value);
    errors.value[field] = "";
  } catch (error) {
    errors.value[error.path] = error.message;
  }
};
</script>
<template>
  <div class="col-md-6 mx-auto py-4">
    <h2>Register</h2>
    <br />
    <form @submit.prevent="registerUser">
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br />
    <p>Alreday registered ? <router-link to="/">login here</router-link></p>
  </div>
</template>
