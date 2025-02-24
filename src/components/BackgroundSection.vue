<template>
  <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen"
  >
    <div
      class="absolute top-0 w-full h-full bg-center bg-cover"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    >
      <span
        id="blackOverlay"
        class="w-full h-full absolute opacity-75 bg-black"
      ></span>
    </div>

    <div class="container relative mx-auto">
      <!-- Títulos centrados -->
      <div class="w-full px-4 text-center">
        <h1 v-if="title" class="text-white font-semibold text-5xl mb-4">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-4 text-lg text-blueGray-200 mb-8">
          {{ subtitle }}
        </p>
      </div>

      <!-- Slot para contenido adicional (como el formulario), centrado -->
      <div class="flex justify-center w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
/* Estilos personalizados opcionales */
</style>
