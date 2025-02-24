<template>
  <a
    @click.prevent="handleLogout"
    href="#"
    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <v-icon class="text-red-500">mdi-logout</v-icon>
    <span class="ml-3 text-red-500">Cerrar sesión</span>
  </a>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Error durante el logout:", error);
    alert("Error al cerrar sesión, intenta de nuevo.");
  }
};
</script>
