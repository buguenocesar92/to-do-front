<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600">403</h1>
      <p class="text-xl mt-2">Access Denied</p>
      <p class="text-gray-600 mt-2">You do not have permission to access this page.</p>
      <router-link to="/dashboard" class="text-blue-500 hover:underline mt-4 block">
        Go back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AccessDenied',
}
</script>
