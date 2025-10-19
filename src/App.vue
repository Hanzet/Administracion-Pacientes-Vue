<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import Header from "./components/Header.vue";
import Formulario from "./components/Formulario.vue";
import Paciente from "./components/Paciente.vue";
import { uid } from "uid";

const pacientes = ref([]); // Array de pacientes

const paciente = reactive({
  // Objeto paciente
  id: null,
  nombre: "",
  propietario: "",
  email: "",
  alta: "",
  sintomas: "",
});

// Utilizamos el state de pacientes para guardar en el localStorage
watch(
  pacientes,
  () => {
    // watch es un hook que se ejecuta cuando el valor de pacientes cambia
    guardarLocalStorage();
  },
  {
    deep: true, // deep: true es para que se ejecute cuando el valor de pacientes cambia, es decir, cuando se agregue un paciente, se actualice el localStorage
  }
);

const guardarLocalStorage = () => {
  localStorage.setItem("pacientes", JSON.stringify(pacientes.value));
};

onMounted(() => {
  const pacientesStorage = localStorage.getItem("pacientes");
  if (pacientesStorage) {
    pacientes.value = JSON.parse(pacientesStorage);
  }
});

// pacientes.value porque es un ref y no un reactive
const guardarPaciente = () => {
  if (paciente.id) {
    const { id } = paciente;
    const i = pacientes.value.findIndex((paciente) => paciente.id === id);
    pacientes.value[i] = { ...paciente };
    // console.log("Edición");
  } else {
    pacientes.value.push({
      // Push pone un elemento al final de arreglo
      ...paciente, // Creamos una copia del objeto paciente, con esto quitamos la reactividad
      id: uid(), // Generamos un id único para cada paciente, no hay necesidad de ponerlo en el assign porque no es reactivo (con el ...paciente, ya no es reactivo)
    });
    // console.log('Registro Nuevo')
  }

  // console.log(pacientes.value); // Mostramos el array de pacientes en consola

  // Reiniciar el formulario
  // paciente.nombre = "";
  // paciente.propietario = "";
  // paciente.email = "";
  // paciente.alta = "";
  // paciente.sintomas = "";

  // Otra forma de reiniciar el formulario
  Object.assign(paciente, {
    nombre: "",
    propietario: "",
    email: "",
    alta: "",
    sintomas: "",
    id: null,
  });
};

const actualizarPaciente = (id) => {
  // Tomo el id del paciente a actualizar
  const pacienteEditar = pacientes.value.filter(
    (paciente) => paciente.id === id
  )[0]; // Accedemos a la primera posición [0], ya que filter retorna un objeto y no un array
  // console.log(pacienteEditar)
  Object.assign(paciente, pacienteEditar);
};

const eliminarPaciente = (id) => {
  pacientes.value = pacientes.value.filter((paciente) => paciente.id !== id);
  // console.log(eliminarPaciente, id)
};
</script>

<template>
  <div class="container mx-auto mt-2">
    <Header />
    <div class="mt-12 md:flex">
      <Formulario
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
        :id="paciente.id"
      />

      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-center text-black">Administrar Pacientes</h3>

        <div v-if="pacientes.length > 0">
          <p class="text-black font-bold mt-5 text-center">
            Información de
            <span class="text-green-500 font-bold">Pacientes</span>
          </p>
          <Paciente
            v-for="paciente in pacientes"
            :key="paciente.id"
            :paciente="paciente"
            @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente"
          />
        </div>
        <p v-else class="text-black font-bold text-center">No hay pacientes</p>
      </div>
    </div>
  </div>
</template>
