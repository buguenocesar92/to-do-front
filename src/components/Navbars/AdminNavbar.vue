<template>
  <nav class="relative top-0 left-0 w-full bg-black md:flex-row md:flex-nowrap md:justify-between flex items-center md:p-4 px-4">
    <div class="w-full flex items-center justify-between">
      <!-- Brand -->
      <a class="text-white text-sm uppercase font-semibold" href="#">
        Dashboard
      </a>

        <!-- Dropdown de usuario, etc. -->
        <user-dropdown />
      </div>
  </nav>
</template>

<script setup lang="ts">
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
</script>
