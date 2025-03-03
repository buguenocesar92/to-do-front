<template>
  <div class="form-group">
    <label
      :for="id"
      class="block text-gray-700 font-medium mb-1"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      @input="onInput"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :class="[
        'w-full border px-3 py-2 rounded focus:outline-none focus:ring-2',
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500',
      ]"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">

// Definir props
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], required: true },
  error: { type: String, default: '' },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});

// Definir eventos
const emit = defineEmits(['update:modelValue']);

// Manejar el evento de entrada
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.form-group input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
