<template>
  <button
    @click="navigateToRegister"
    class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors"
  >
    Crear Usuario
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GoToRegisterButton',
  setup() {
    const router = useRouter()

    const navigateToRegister = () => {
      router.push('/register-user') // Cambia esta ruta según tu configuración
    }

    return {
      navigateToRegister,
    }
  },
})
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
