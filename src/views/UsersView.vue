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
        <button
          type="button"
          class="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          Delete
        </button>
      </div>

      <!-- updateModal :: start -->
      <teleport to=".modals-container">
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="editModalLabel">Edit User</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="first_name" class="col-form-label"
                      >FirstName:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="first_name"
                      v-model="fname"
                      :placeholder="user.first_name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="last_name" class="col-form-label"
                      >LastName:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="last_name"
                      v-model="lname"
                      :placeholder="user.last_name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="col-form-label">Email:</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="email"
                      :placeholder="user.email"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click.prevent="editUser(user)"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </teleport>
      <!-- updateModal :: end -->

      <!-- deleteModal :: start -->
      <teleport to=".modals-container">
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">
                  Confirmation
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete
                <b>{{ `${user.first_name} ${user.last_name} ?` }}</b>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  @click="deleteUser(user.id)"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </teleport>
      <!-- deleteModal :: end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
let fname = ref<string>("");
let lname = ref<string>("");
let email = ref<string>("");

onMounted(() => {
  authStore.listUsers();
});
const editUser = (e: any) => {
  authStore.editUser(e);
};
const deleteUser = (e: number) => {
  authStore.deleteUser(e);
};
</script>
