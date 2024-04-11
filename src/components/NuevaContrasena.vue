<template>
  <div class="body">
    <div class="container">
      <h2>Nueva contraseña</h2>
      <p class="texto1">Por favor ingresa la nueva contraseña y confirma la misma.</p>
      <form @submit.prevent="restablecerContraseña">
        <div class="contenedor_input">
          <input v-model="contraseña" type="password" placeholder="Nueva contraseña" required />
          <br />
          <input v-model="confirmarContraseña" type="password" placeholder="Confirmar contraseña" required />
        </div>
        <div class="contenedor_boton">
          <button type="submit" :disabled="!contraseñasCoinciden">Restablecer</button>
          <router-link to="/">
            <button type="button">Cancelar</button>
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
import { useRouter } from "vue-router";
import { Cookies } from "quasar";

const router = useRouter();
const usuarioStore = useusuariostore();

const contraseña = ref("");
const confirmarContraseña = ref("");

const contraseñasCoinciden = computed(() => contraseña.value === confirmarContraseña.value);

const restablecerContraseña = async () => {
  // Validación de contraseñas
  if (!contraseñasCoinciden.value) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    const correo = usuarioStore.usuarioLogeado ? usuarioStore.usuarioLogeado.Correo : Cookies.get("correo");
    const response = await usuarioStore.newpassword({
      Correo: correo,
      codigo: Cookies.get("codigo"),
      Contraseña: contraseña.value,
    });
    console.log(response);
    if (response.status === 200) {
      console.log("Contraseña restablecida con éxito");
      router.push("/");
    } else {
      console.error("Error al restablecer la contraseña:", response.error);
    }
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
  }
};
</script>
