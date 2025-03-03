<script setup lang="ts">
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import BackgroundSection from "@/components/BackgroundSection.vue";
import FormInput from '@/components/FormInput.vue';
import { useLoginForm } from '@/composables/useLoginForm';

// Extraemos la lógica del formulario desde el composable
const { form, isLoading, errors, errorMessage, handleLogin } = useLoginForm();
</script>

<template>
  <div>
    <Navbar />
    <!-- Fondo reutilizable -->
    <BackgroundSection
      imageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title="Inicia Sesión en tu Cuenta"
      subtitle="Ingresa tus credenciales para acceder a tu panel de control."
    >
      <!-- Formulario de Inicio de Sesión -->
      <div class="w-full max-w-lg bg-white shadow-lg rounded px-8 py-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Correo Electrónico -->
          <FormInput
            id="email"
            v-model="form.email"
            :error="errors.email?.[0]"
            type="email"
            required
            label="Correo Electrónico"
            placeholder="Ejemplo: correo@dominio.com"
          />

          <!-- Contraseña -->
          <FormInput
            id="password"
            v-model="form.password"
            :error="errors.password?.[0]"
            type="password"
            required
            label="Contraseña"
            placeholder="Introduce tu contraseña"
          />

          <!-- Botón de inicio de sesión -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Mensaje de error -->
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
          {{ errorMessage }}
        </p>
      </div>
    </BackgroundSection>
    <FooterComponent />
  </div>
</template>
