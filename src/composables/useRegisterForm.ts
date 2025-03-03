import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useFormValidation } from '@/composables/useFormValidation';
import { useNotification } from '@/composables/useNotification';
import type { RegisterUser } from '@/types/AuthTypes';

export function useRegisterForm() {
  const router = useRouter();
  const authStore = useAuthStore();
  const { errors, errorMessage, handleValidationError } = useFormValidation();
  const { showErrorNotification } = useNotification();

  // Estado reactivo del formulario
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

      // Restablecer formulario tras el registro exitoso
      form.value = { name: '', email: '', password: '' };
      passwordConfirmation.value = '';

      // Redirigir al usuario al dashboard
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

  return {
    form,
    passwordConfirmation,
    isLoading,
    errors,
    errorMessage,
    handleRegister,
  };
}
