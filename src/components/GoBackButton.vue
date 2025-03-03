<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Prop opcional: Si se pasa un `name`, redirige a esa ruta; si no, usa `router.back()`
const props = defineProps({
  routeName: {
    type: String,
    required: false,
  },
});

function goBack() {
  if (props.routeName) {
    router.push({ name: props.routeName });
  } else {
    router.back();
  }
}
</script>

<template>
  <v-btn
    color="primary"
    @click="goBack"
    >
  <v-icon start>mdi-arrow-left</v-icon>
            Volver
  </v-btn>
</template>
