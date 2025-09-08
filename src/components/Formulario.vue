<script setup>
import { ref, reactive } from "vue";
import Alerta from "./Alerta.vue";

// const nombre = ref(''); // No utilizamos ref porque tendriamos que crear 5 ref para cada input

const alerta = reactive({
  tipo: "",
  mensaje: "",
});

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
    alerta.mensaje = "Todos los campos son requeridos";
    alerta.tipo = "error";
    return; // Si todos los campos no están llenos, se retorna y no se envía el formulario
  }
  emit("guardar-paciente"); // Emitimos el evento guardar-paciente
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
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">
      Seguimiento Pacientes
      <p class="text-lg mt-5 text-center mb-10">
        Añade Pacientes y
        <span class="text-indigo-600 font-bold">Administralos</span>
      </p>
    </h2>

    <Alerta v-if="alerta.mensaje" :alerta="alerta" />
    <form
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      @submit.prevent="validar"
    >
      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Nombre Mascota
        </label>
        <input
          id="mascota"
          type="text"
          placeholder="Nombre de la mascota"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="nombre"
          @input="$emit('update:nombre', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Nombre Propietario
        </label>
        <input
          id="propietario"
          type="text"
          placeholder="Nombre del propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="propietario"
          @input="$emit('update:propietario', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email del propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Alta
        </label>
        <input
          id="alta"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="alta"
          @input="$emit('update:alta', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Síntomas
        </label>
        <textarea
          id="sintomas"
          placeholder="Describe los síntomas"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-40"
          :value="sintomas"
          @input="$emit('update:sintomas', $event.target.value)"
        />
      </div>

      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value="Registrar Paciente"
      />
    </form>
  </div>
</template>
