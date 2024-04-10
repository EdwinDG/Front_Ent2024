<template>
  <div class="body">
    <div class="container">
      <h2>Nueva contraseña</h2>
      <p class="texto1">Por favor ingresa la nueva contraseña y confirma la misma.</p>
      <form @submit.prevent="restablecerContraseña;">
        <div class="contenedor_input">
          <q-input
            class="input1"
            filled
            v-model="Contraseña"
            label="Escribe la contraseña nueva"
            type="password"
          />
          <br />
          <q-input
            class="input1"
            filled
            v-model="confirmarContraseña"
            label="Confirmar contraseña"
            type="password"
          />
        </div>
        <div class="contenedor_boton">
          <q-btn
            type="submit"
            color="primary"
            label="Restablecer"
            :disable="!contraseñasCoinciden"
          />
          <router-link to="/"> 
          <q-btn type="reset" color="negative" label="Cancelar" />
          </router-link>
        </div>
      </form>
      <p class="texto2">¿Ayuda?</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useusuariostore } from "../stores/Usuario";
import NuevaContrasena from "./CodigoRecuperar.vue";
import { Cookies } from "quasar";

const Contraseña = ref("");
const confirmarContraseña = ref("");

const contraseñasCoinciden = computed(
  () => Contraseña.value === confirmarContraseña.value
);
const useUsuario = useusuariostore();
const Correo = Cookies.get("correo");
const codigo = Cookies.get("codigo");
const restablecerContraseña = async () => {
  if (contraseñasCoinciden.value) {
    try {
      // Hacer la llamada al backend para cambiar la contraseña
      const response = await useUsuario.newpassword({
        Correo,
        codigo,
        Contraseña: Contraseña.value,
      });

      console.log("Contraseña restablecida con éxito", response);
    } catch (error) {
      console.log("Error al restablecer la contraseña", error);
    }
  } else {
    console.log("Las contraseñas no coinciden");
  }
};
</script>

<style scoped>
.body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

h2 {
  display: flex;
  text-align: center;
  margin: 0;
  padding: 0;
}

form {
  display: flex;
  flex-direction: column;
}

fieldset {
  border: none;
  padding: 0;
  margin-bottom: 20px;
}

legend {
  margin-bottom: 10px;
  font-weight: bold;
}

.contenedor_input {
  padding: 10px;
}

.input1 {
  border: 1px solid black;
  border-radius: 5px;
}

.contenedor_boton {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}

.texto1 {
  padding: 10px;
  margin-top: 15%;
}

.texto2 {
  text-align: center;
  padding: 15px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button[type="reset"] {
  background-color: #6c757d;
}

button[type="reset"]:hover {
  background-color: #5a6268;
}

@media screen and (max-width: 350px) {
  .body {
    justify-content: flex-start;
    padding: 20px;
  }

  .container {
    border-radius: 0;
    max-width: 100%;
  }

  p {
    padding: 15px;
    margin-top: 10px;
  }

  h2 {
    font-size: 3em;
  }

  .contenedor_boton {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  button {
    margin-bottom: 10px;
  }
}
</style>
