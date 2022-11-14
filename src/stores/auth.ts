import { defineStore } from "pinia";
import axios from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";
// import { useRouter } from "vue-router";
import router from "../router/index";

const cookies = useCookies();
// const router = useRouter();

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
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    users: [],
    token: "",
    isAuthenticated: false,
  }),
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
    // Register
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
    // Login
    async loginUser(payload: CredPayload): Promise<void> {
      try {
        const res = await axios.post("https://reqres.in/api/login", payload);
        if (res.status === 200) {
          this.token = res.data.token;
          cookies.set("auth_token", res.data.token);
          this.isAuthenticated = true;
          router.push({ name: "users" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Edit
    editUser(id: number) {
      console.log(`user id to update ${id}`);
    },
    // Delete
    async deleteUser(id: number): Promise<void> {
      try {
        const res = await axios.delete(`https://reqres.in/api/users/${id}`);
        if (res.status === 204) {
          this.listUsers();
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    //Logout
    logoutUser() {
      this.token = "";
      cookies.remove("auth_token");
      this.isAuthenticated = false;
      router.push({ name: "home" });
    },
  },
});
