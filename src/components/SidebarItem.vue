<!-- SidebarItem.vue -->
<template>
  <RouterLink
    :to="item.route"
    class="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    active-class="bg-gray-200 dark:bg-gray-700"
  >
    <v-icon class="w-5 h-5">{{ item.icon }}</v-icon>
    <span class="ml-3">{{ item.label }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface SidebarItem {
  label: string;
  route: string;
  icon: string; // Ahora los íconos son nombres de Vuetify
}

defineProps<{
  item: SidebarItem
}>();
</script>

