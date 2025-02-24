<template>
  <div class="relative flex items-center space-x-3">
    <!-- Información del usuario (izquierda) -->
    <div v-if="authStore.isAuthenticated" class="text-right">
      <p class="text-sm font-semibold text-gray-800">{{ authStore.name }}</p>
      <p class="text-xs text-gray-500">{{ authStore.email }}</p>
    </div>

    <!-- Imagen de perfil y dropdown -->
    <a
      class="text-blueGray-500 block"
      href="#"
      ref="btnDropdownRef"
      @click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="Usuario"
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>

    <!-- Menú desplegable -->
    <div
      ref="popoverDropdownRef"
      class="absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0 mt-2"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Perfil
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Configuración
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <!-- Botón de Cerrar Sesión -->
      <LogoutButton />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createPopper } from "@popperjs/core";
import { useAuthStore } from "@/stores/authStore";
import LogoutButton from "@/components/LogoutButton.vue"; // Importa el botón de logout

import image from "@/assets/img/team-1-800x800.jpg";

const authStore = useAuthStore();
const dropdownPopoverShow = ref(false);
const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);

// Alternar dropdown
const toggleDropdown = (event) => {
  event.preventDefault();
  dropdownPopoverShow.value = !dropdownPopoverShow.value;
  if (dropdownPopoverShow.value) {
    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start",
    });
  }
};
</script>
