<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Props y eventos
defineProps({
  isLoading: Boolean,
  error: String,
});

const emit = defineEmits(['search']);

const search = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * Emitir búsqueda
 */
function handleSearch() {
  if (search.value) {
    emit('search', search.value);
    search.value = '';
  }
}

// Enfocar el input al montar el componente
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div class="flex items-center mb-4">
    <label for="product-code" class="mr-2 font-medium">Código del Producto:</label>
    <v-text-field
      id="product-code"
      ref="inputRef"
      v-model="search"
      placeholder="Buscar producto"
      outlined
      dense
      @keydown.enter="handleSearch"
    ></v-text-field>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>
