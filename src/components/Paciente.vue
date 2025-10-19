<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";

const emit = defineEmits(["actualizar-paciente", "eliminar-paciente"]);

const props = defineProps({
  paciente: {
    type: Object,
    required: true,
  },
});

const visible = ref(false);
const toast = useToast();

const confirmarEliminar = () => {
  visible.value = true;
};

const eliminarConfirmado = () => {
  emit("eliminar-paciente", props.paciente.id);
  visible.value = false;
  toast.add({
    severity: "success",
    summary: "Éxito",
    detail: "Paciente eliminado correctamente",
    life: 3000,
  });
};
</script>

<template>
  <div class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p class="font-bold mb-3 text-black uppercase">
      ID:
      <span class="font-normal normal-case"> {{ paciente.id }} </span>
    </p>

    <p class="font-bold mb-3 text-black uppercase">
      Nombre:
      <span class="font-normal normal-case">{{ paciente.nombre }}</span>
    </p>

    <p class="font-bold mb-3 text-black uppercase">
      Propietario:
      <span class="font-normal normal-case"> {{ paciente.propietario }} </span>
    </p>

    <p class="font-bold mb-3 text-black uppercase">
      Email:
      <span class="font-normal normal-case"> {{ paciente.email }} </span>
    </p>

    <p class="font-bold mb-3 text-black uppercase">
      Fecha Alta:
      <span class="font-normal normal-case"> {{ paciente.alta }} </span>
    </p>

    <p class="font-bold mb-3 text-black uppercase">
      Síntomas:
      <span class="font-normal normal-case"> {{ paciente.sintomas }} </span>
    </p>

    <div class="grid md:grid-cols-2 gap-2 mt-3">
      <Button
        label="Editar"
        icon="pi pi-pencil"
        severity="info"
        class="w-full"
        size="small"
        @click="$emit('actualizar-paciente', paciente.id)"
      />

      <Button
        label="Eliminar"
        icon="pi pi-trash"
        severity="danger"
        class="w-full"
        size="small"
        @click="confirmarEliminar"
      />
    </div>

    <!-- Diálogo de confirmación -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <div class="flex align-items-start gap-2 mb-2">
        <i
          class="pi pi-exclamation-triangle text-red-500"
          style="font-size: 2rem"
        ></i>
        <span>
          ¿Estás seguro de que deseas eliminar al paciente
          <strong>{{ paciente.nombre }}</strong
          >?
        </span>
      </div>
      <p class="text-sm">Esta acción no se puede deshacer.</p>
      <template #footer>
        <div class="flex justify-start gap-2">
          <Button
            label="Eliminar"
            severity="danger"
            size="small"
            @click="eliminarConfirmado"
          />
          <Button
            label="Cancelar"
            severity="secondary"
            size="small"
            @click="visible = false"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
