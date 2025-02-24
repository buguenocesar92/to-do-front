<script setup lang="ts">
import { ref, defineOptions } from 'vue';
import Swal from 'sweetalert2';
import FormInput from '@/components/FormInput.vue';
import { registerTenant } from '@/services/TenantService';
import { useFormValidation } from '@/composables/useFormValidation';
import type { RegisterTenantPayload } from '@/types/TenantTypes';
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import BackgroundSection from "@/components/BackgroundSection.vue";

// (Opcional) Asigna un nombre al componente (útil para devtools/logs)
defineOptions({ name: 'RegisterTenant' });

// Estado reactivo
const form = ref<RegisterTenantPayload>({
  tenant_id: '',
  user_name: '',
  user_email: '',
  user_password: '',
});
const isLoading = ref(false);
const loginUrl = ref<string | null>(null);

// Composables para validación
const { errors, handleValidationError } = useFormValidation();

/**
 * Maneja el evento de registro de Tenant.
 */
 async function handleRegister() {
  isLoading.value = true;

  try {
    const { frontend_url } = await registerTenant(form.value);
    loginUrl.value = `${frontend_url.toLowerCase()}/login`;

    // Mostrar notificación con enlace
    await Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      html: `
        <p>Tu cuenta ha sido registrada exitosamente. Puedes iniciar sesión en:</p>
        <a href="${loginUrl.value}" class="text-blue-500 underline" target="_blank">
          ${loginUrl.value}
        </a>
      `,
      confirmButtonText: 'Aceptar',
    });

    // Limpiar formulario
    form.value = {
      tenant_id: '',
      user_name: '',
      user_email: '',
      user_password: '',
    };
  } catch (error) {
    handleValidationError(error);
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Fondo reutilizable -->
    <main>
      <BackgroundSection
        imageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Registra Tu Cuenta"
        subtitle="Crea tu cuenta para comenzar a usar nuestros servicios. ¡Es rápido y fácil!"
      >
        <!-- Formulario de Registro -->
        <div class="w-full max-w-lg bg-white shadow-lg rounded px-8 py-6">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- Nombre de la Empresa -->
            <div>
              <FormInput
                id="tenant_id"
                v-model="form.tenant_id"
                :error="errors.tenant_id?.[0]"
                required
                label="Nombre de tu empresa u organización"
                placeholder="Ejemplo: Mi-Empresa-S.A."
              />
            </div>

            <!-- Nombre del Administrador -->
            <div>
              <FormInput
                id="user_name"
                v-model="form.user_name"
                :error="errors.user_name?.[0]"
                required
                label="Tu nombre completo"
                placeholder="Ejemplo: Juan Pérez"
              />
            </div>

            <!-- Correo Electrónico -->
            <div>
              <FormInput
                id="user_email"
                v-model="form.user_email"
                :error="errors.user_email?.[0]"
                type="email"
                required
                label="Correo electrónico"
                placeholder="Ejemplo: correo@dominio.com"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <FormInput
                id="user_password"
                v-model="form.user_password"
                :error="errors.user_password?.[0]"
                type="password"
                required
                label="Crea una contraseña"
                placeholder="Debe tener al menos 8 caracteres"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-black text-white font-medium py-2 rounded hover:bg-green-500 transition-colors disabled:opacity-50"
            >
              {{ isLoading ? "Registrando..." : "Registrar" }}
            </button>


          </form>
        </div>
      </BackgroundSection>
    </main>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

