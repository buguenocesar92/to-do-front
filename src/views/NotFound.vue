<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>La página que estás buscando no existe.</p>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
}
</script>
