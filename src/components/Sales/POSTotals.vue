<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  total: { type: Number, default: 0 },
  isLoading: Boolean,
  hasItems: Boolean,
});

defineEmits(['confirm', 'clear']);

const router = useRouter();

// Función para redirigir al cierre de caja
function navigateToCloseRegister() {
  router.push({ name: 'CashRegisterClose' });
}
</script>

<template>
  <div class=" md:w-1/4 bg-gray-200 p-6 rounded-lg shadow-md flex flex-col gap-4">
    <!-- Totales -->
    <div class="text-center">
      <h3 class="text-xl font-semibold">Totales</h3>
      <p class="text-lg text-gray-700 font-medium">Total: ${{ total.toFixed(2) }}</p>
    </div>

    <!-- Botones -->
    <div class="flex flex-col gap-3">
      <v-btn
        color="success"
        class="w-full py-2 text-lg font-medium"
        :disabled="!hasItems || isLoading"
        @click="$emit('confirm')"
      >
        Confirmar Venta
      </v-btn>

      <v-btn
        color="error"
        class="w-full py-2 text-lg font-medium"
        @click="$emit('clear')"
      >
        Cancelar Venta
      </v-btn>

      <v-btn color="info" class="w-full py-2 text-lg font-medium" @click="navigateToCloseRegister">
        Cerrar Caja
      </v-btn>
    </div>
  </div>
</template>
