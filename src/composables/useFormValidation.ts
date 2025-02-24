import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import type { ValidationErrorResponse } from '@/types/ValidationErrorResponse';
import { useRouter } from 'vue-router';

export function useFormValidation() {
  const errors = ref<{ [key: string]: string[] }>({});
  const errorMessage = ref<string | null>(null);
  const router = useRouter();

  const handleValidationError = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      errorMessage.value = 'An unexpected error occurred.';
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: errorMessage.value,
        confirmButtonText: 'OK',
      });
      return;
    }

    const { response } = error as AxiosError<ValidationErrorResponse>;
    if (response?.status === 422) {
      // Manejar errores de validación
      errors.value = response.data.errors as { [key: string]: string[] };
      errorMessage.value = response.data.message || 'Validation error occurred.';

      // Crear un mensaje HTML dinámico para mostrar los errores detallados
      const errorDetails = Object.entries(errors.value)
        .map(([field, messages]) => `<p><strong>${field}:</strong> ${messages.join(', ')}</p>`)
        .join('');

      // Mostrar SweetAlert2 con los errores detallados
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: errorDetails,
        confirmButtonText: 'OK',
      });
    } else if (response?.status === 401) {
      errorMessage.value = 'Credenciales incorrectas.';
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: errorMessage.value,
        confirmButtonText: 'OK',
      });
    } else if (response?.status === 403) {
      errorMessage.value = 'You do not have permission to perform this action.';
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: errorMessage.value,
        confirmButtonText: 'OK',
      }).then(() => {
        router.push('/403'); // Redirigir al 403
      });
    } else if (response?.status === 409) {
      errorMessage.value = response.data.message || 'A conflict occurred.';
      Swal.fire({
        icon: 'error',
        title: 'Conflict',
        text: errorMessage.value,
        confirmButtonText: 'OK',
      });
    } else {
      errorMessage.value = 'Unexpected error occurred. Please try again later.';
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: errorMessage.value,
        confirmButtonText: 'OK',
      });
    }
  };

  return {
    errors,
    errorMessage,
    handleValidationError,
  };
}
