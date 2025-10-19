<script setup>
import { computed } from "vue";
import Message from "primevue/message";

const props = defineProps({
  // Macro para definir las props
  alerta: {
    type: Object,
    required: true,
  },
});

const severity = computed(() => {
  return props.alerta.tipo === "error" ? "error" : "success";
});
</script>

<template>
  <Message
    v-if="alerta.mensaje"
    :severity="severity"
    :closable="false"
    class="mb-3"
  >
    {{ alerta.mensaje }}
  </Message>
</template>
