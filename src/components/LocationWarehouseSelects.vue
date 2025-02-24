<!-- src/components/LocationWarehouseSelects.vue -->
<template>
  <div class="flex items-center space-x-4">
    <!-- 🔹 Select de Locales -->
    <div class="w-52">
      <FormSelect
        v-model="selectedLocation"
        id="location_id"
        label="Seleccionar Local"
        :options="locations"
        placeholder="Seleccione un local"
        placeholderValue="0"
        required
        @change="handleLocationChange"
      />
    </div>

    <!-- 🔹 Select de Bodegas -->
    <div class="w-72">
      <FormSelect
        v-model="selectedWarehouse"
        id="warehouse_id"
        label="Seleccionar Bodega"
        :options="locationWarehouseStore.warehouseList"
        placeholder="Seleccione una bodega"
        placeholderValue="0"
        required
        @change="handleWarehouseChange"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import FormSelect from "@/components/FormSelect.vue";
import { useLocationWarehouseSelect } from "@/composables/useLocationWarehouseSelect";

// Usamos el composable original para obtener la lógica y datos necesarios
const {
  locationWarehouseStore,
  locations,
  selectedLocation,
  selectedWarehouse,
  handleLocationChange,
  handleWarehouseChange,
} = useLocationWarehouseSelect();
</script>
