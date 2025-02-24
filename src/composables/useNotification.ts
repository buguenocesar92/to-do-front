import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export function useNotification() {
  const router = useRouter();

  const showSuccessNotification = async (title: string, text: string, redirectPath?: string) => {
    await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
    });

    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  const showErrorNotification = async (title: string, text: string) => {
    await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };

  return {
    showSuccessNotification,
    showErrorNotification,
  };
}
