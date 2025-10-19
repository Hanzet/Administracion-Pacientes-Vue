<script setup>
import { ref, reactive, computed } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

// const nombre = ref(''); // No utilizamos ref porque tendriamos que crear 5 ref para cada input

const toast = useToast();

// Macro para definir los eventos (defineEmits es una macro para definir los eventos, lo vuelvo a variable emit para poder usarlo en el componente)
const emit = defineEmits([
  "update:nombre",
  "update:propietario",
  "update:email",
  "update:alta",
  "update:sintomas",
  "guardar-paciente",
]);

const props = defineProps({
  id: {
    type: [String, null],
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  propietario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  alta: {
    type: String,
    required: true,
  },
  sintomas: {
    type: String,
    required: true,
  },
});

// Movemos paciente a App.vue para que se pueda usar en el formulario y en el listado de pacientes
// const paciente = reactive({
//   // Utilizamos reactive para crear un objeto reactivo y no tener que crear 5 ref para cada input
//   nombre: "",
//   propietario: "",
//   email: "",
//   fecha: "",
//   sintomas: "",
// });

const validar = () => {
  // e.preventDefault(); // Evita que el formulario se envie y se recargue la página, internamente el formulario tiene un action que es el que se encarga de enviar el formulario
  // @submit.prevent="validar" // En vuejs se utiliza submit.prevent para evitar que el formulario se envie y se recargue la página, internamente el formulario tiene un action que es el que se encarga de enviar el formulario

  // Verificamos si todos los campos están llenos, includes es un método que verifica si el valor está incluido en el array
  // if ([paciente.nombre, paciente.propietario, paciente.email, paciente.fecha, paciente.sintomas].includes('')) {
  //   alert('Todos los campos son requeridos');
  // } else {
  //   alert('Formulario enviado correctamente');
  // }

  if (Object.values(props).includes("")) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Todos los campos son requeridos",
      life: 3000,
    });
    return; // Si todos los campos no están llenos, se retorna y no se envía el formulario
  }
  emit("guardar-paciente"); // Emitimos el evento guardar-paciente

  if (props.id) {
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Paciente actualizado correctamente",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Paciente agregado correctamente",
      life: 3000,
    });
  }
};

/* Ejemplo con JavaScript puro
const nombreInput = document.querySelector('#input');
nombreInput.addEventListener('input', (e) => {
  console.log(e.target.value);
  nombre.value = e.target.value;
});
*/

/* Ejemplo con Formulario JavaScript puro
const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', function() {
  e.preventDefault();
  console.log(paciente);
});
*/

const editando = computed(() => {
  return props.id;
});
</script>

<template>
  <div class="md:w-1/2">
    <div class="text-center mb-8">
      <h2 class="font-black mb-2 text-black">Seguimiento Pacientes</h2>
      <p class="text-black font-bold">
        Añade Pacientes y
        <span class="text-green-500 font-bold">Administralos</span>
      </p>
    </div>

    <Toast />
    <form
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      @submit.prevent="validar"
    >
      <div class="mb-5">
        <label for="mascota" class="block text-black uppercase font-bold mb-2">
          Nombre Mascota
        </label>
        <InputText
          id="mascota"
          placeholder="Nombre de la mascota"
          class="w-full"
          :modelValue="nombre"
          @update:modelValue="$emit('update:nombre', $event)"
        />
      </div>

      <div class="mb-5">
        <label
          for="propietario"
          class="block text-gray-700 uppercase font-bold mb-2"
        >
          Nombre Propietario
        </label>
        <InputText
          id="propietario"
          placeholder="Nombre del propietario"
          class="w-full"
          :modelValue="propietario"
          @update:modelValue="$emit('update:propietario', $event)"
        />
      </div>

      <div class="mb-5">
        <label for="email" class="block text-gray-700 uppercase font-bold mb-2">
          Email
        </label>
        <InputText
          id="email"
          type="email"
          placeholder="Email del propietario"
          class="w-full"
          :modelValue="email"
          @update:modelValue="$emit('update:email', $event)"
        />
      </div>

      <div class="mb-5">
        <label for="alta" class="block text-gray-700 uppercase font-bold mb-2">
          Alta
        </label>
        <InputText
          id="alta"
          type="date"
          class="w-full"
          :modelValue="alta"
          @update:modelValue="$emit('update:alta', $event)"
        />
      </div>

      <div class="mb-5">
        <label
          for="sintomas"
          class="block text-gray-700 uppercase font-bold mb-2"
        >
          Síntomas
        </label>
        <Textarea
          id="sintomas"
          placeholder="Describe los síntomas"
          class="w-full"
          rows="5"
          :modelValue="sintomas"
          @update:modelValue="$emit('update:sintomas', $event)"
        />
      </div>

      <Button
        type="submit"
        :label="editando ? 'Guardar cambios' : 'Registrar Paciente'"
        class="w-full"
        severity="info"
        size="small"
      />
    </form>
  </div>
</template>
