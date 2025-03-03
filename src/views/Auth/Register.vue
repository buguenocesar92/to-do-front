<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useFormValidation } from '@/composables/useFormValidation';
import { useNotification } from '@/composables/useNotification';
import type { RegisterUser } from '@/types/AuthTypes';

// Components
import FormInput from '@/components/FormInput.vue';
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import BackgroundSection from "@/components/BackgroundSection.vue";

// Hooks
const router = useRouter();
const authStore = useAuthStore();
const { errors, errorMessage, handleValidationError } = useFormValidation();
const { showErrorNotification } = useNotification();

// Estado reactivo
const form = ref<RegisterUser>({
  name: '',
  email: '',
  password: '',
});
const passwordConfirmation = ref('');
const isLoading = ref(false);

// Validación de contraseñas
const validatePasswords = () => {
  if (form.value.password !== passwordConfirmation.value) {
    throw new Error('Las contraseñas no coinciden');
  }
  if (form.value.password.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres');
  }
};

// Manejo del registro
async function handleRegister() {
  isLoading.value = true;
  errors.value = {};
  errorMessage.value = null;

  try {
    validatePasswords();
    await authStore.register(form.value);

    form.value = { name: '', email: '', password: '' };
    passwordConfirmation.value = '';

    router.push('/dashboard');
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      await showErrorNotification('Error de Registro', errorMessage.value);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <Navbar />

    <main>
      <BackgroundSection
        imageUrl="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Únete a nuestra plataforma"
        subtitle="Crea tu cuenta y comienza a disfrutar de nuestros servicios"
      >
        <div class="w-full max-w-lg bg-white shadow-lg rounded px-8 py-6">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <FormInput
              id="name"
              v-model="form.name"
              :error="errors.name?.[0]"
              required
              label="Nombre completo"
              placeholder="Ejemplo: Juan Pérez"
            />

            <FormInput
              id="email"
              v-model="form.email"
              :error="errors.email?.[0]"
              type="email"
              required
              label="Correo electrónico"
              placeholder="Ejemplo: correo@dominio.com"
            />

            <FormInput
              id="password"
              v-model="form.password"
              :error="errors.password?.[0]"
              type="password"
              required
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
            />

            <FormInput
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              type="password"
              required
              label="Confirmar Contraseña"
              placeholder="Repite tu contraseña"
            />

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ isLoading ? "Registrando..." : "Crear Cuenta" }}
            </button>

            <p class="text-center text-gray-600 mt-4">
              ¿Ya tienes cuenta?
              <router-link
                to="/login"
                class="text-blue-600 hover:underline"
              >
                Inicia Sesión
              </router-link>
            </p>

            <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
              {{ errorMessage }}
            </p>
          </form>
        </div>
      </BackgroundSection>
    </main>

    <FooterComponent />
  </div>
</template>
