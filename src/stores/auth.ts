import { defineStore } from "pinia";
import axios from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";
import router from "../router/index";

const cookies = useCookies();

interface CredPayload {
  email: string;
  password: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  users: User[];
  token: string;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    users: [],
    token: "",
  }),
  getters: {
    isLoggedIn() {
      return cookies.get("auth_token") !== undefined ? true : false;
    },
  },
  actions: {
    // List Users
    async listUsers(): Promise<void> {
      try {
        const res = await axios.get("https://reqres.in/api/users");
        if (res.status === 200) {
          this.users = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Register User
    async registerUser(payload: CredPayload): Promise<void> {
      try {
        const res = await axios.post("https://reqres.in/api/register", payload);
        if (res.status === 200) {
          this.token = res.data.token;
          cookies.set("auth_token", res.data.token);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Login User
    async loginUser(payload: CredPayload): Promise<void> {
      try {
        const res = await axios.post("https://reqres.in/api/login", payload);
        if (res.status === 200) {
          this.token = res.data.token;
          cookies.set("auth_token", res.data.token);
          router.push({ name: "users" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Edit User
    editUser(payload: number) {
      alert(`payload to update = ${JSON.stringify(payload)}`);
    },
    // Delete User
    async deleteUser(id: number): Promise<void> {
      try {
        const res = await axios.delete(`https://reqres.in/api/users/${id}`);
        if (res.status === 204) {
          alert("User Deleted successfully");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    //Logout User
    logoutUser() {
      cookies.remove("auth_token");
      router.push({ name: "home" });
    },
  },
});
