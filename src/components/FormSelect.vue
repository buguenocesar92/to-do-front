<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  options: {
    type: Array as PropType<Array<{ id: number; name: string }>>,
    required: true,
    default: () => [],
  },
  modelValue: {
    // Se agrega 'undefined' al union type
    type: [String, Number, null] as PropType<string | number | null | undefined>,
    required: true,
  },
  placeholder: { type: String, default: 'Select an option' },
  placeholderValue: { type: [String, Number], default: 0 },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const computedValue = computed({
  get: () => props.modelValue ?? props.placeholderValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="form-select-container">
    <label :for="id" class="block font-medium mb-1">
      {{ label }}
    </label>

    <select
      :id="id"
      v-model="computedValue"
      class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      :class="{ 'border-red-500': error }"
      :required="required"
    >
      <option :value="placeholderValue" class="text-gray-400">
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        class="text-gray-800"
      >
        {{ option.name }}
      </option>
    </select>

    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
