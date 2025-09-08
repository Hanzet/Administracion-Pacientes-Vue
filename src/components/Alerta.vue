<script setup>
import { computed } from "vue";

const props = defineProps({
  // Macro para definir las props
  alerta: {
    type: Object,
    required: true,
  },
});

const isError = computed(() => {
  return props.alerta.tipo === 'error';
});

// Si isError es true, se aplica la clase bg-red-500, si es false, se aplica la clase bg-green-500
// :class="[isError ? 'bg-red-500' : 'bg-green-500']"
</script>

<template>
  <div
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
  >
    {{ alerta.mensaje }}
  </div>
</template>
