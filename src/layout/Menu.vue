<template>
  <q-layout view="hHh LpR fFf" class="body">
    <q-header elevated class="custom-header">
      <q-toolbar class="bg-positive" style="background: #2e7d32 !important">
        <button dense flat @click="toggleLeftDrawer" class="btnmenu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <q-toolbar-title class="text-white">
          <i class="fa-solid fa-city"></i>
          Inventario
        </q-toolbar-title>
        <!--  <router-link to="./DistribucionPresupuesto">
          <button class="btndispre">
            Distribucion de presupuesto
          </button>
        </router-link> -->
        <select name="" id=""></select>

        <q-btn-dropdown
          class="btnlogout"
          icon="exit_to_app"
          flat
          src="/"
          @click="confirm"
          split
          dropdown-icon=""
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Ajustes</div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ nombreUsuario }}
              </div>
              <q-btn
                color="primary"
                dense
                flat
                src="/"
                @click="confirm"
                label="Cerrar sesión"
                push
                size="sm"
                v-close-popup
              >
              </q-btn>
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="230"
      style="background-color: #222d32"
      :breakpoint="400"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 85px">
        <q-list padding class="list">
          <div class="div1">
            <q-item-section>
              <h6 class="text2">Menu</h6>
            </q-item-section>
          </div>

          <router-link v-if="checkAccess('Home')" to="/Home">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-house"></i>
              </q-item-section>
              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Inicio</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('Contrato')" to="/Contrato">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-file-contract"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Contrato</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('TablaFichas')" to="./TablaFichas">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-users-line"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Fichas</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link
            v-if="checkAccess('TablaProductos')"
            to="./TablaProductos"
          >
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-boxes-packing"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Productos</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('TablaUsuarios')" to="./TablaUsuarios">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-address-card"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Usuarios</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('TablaArea')" to="./TablaArea">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-network-wired"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Dependencias</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('TablaLotes')" to="./TablaLotes">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-layer-group"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Lotes</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('TablaPedidos')" to="./TablaPedidos">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-truck-ramp-box"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Pedidos</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link v-if="checkAccess('Perfil')" to="/Perfil">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-user"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Perfil</h6>
              </q-item-section>
            </div>
          </router-link>
          <router-link
            v-if="checkAccess('TablaHistorial')"
            to="./TablaHistorial"
          >
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-book-bookmark"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Historial</h6>
              </q-item-section>
            </div>
          </router-link>
          <!-- <router-link to="./ItemPresupuesto">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-money-check-dollar"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100;">Presupuesto</h6>
              </q-item-section>
            </div>
          </router-link> -->
          <router-link to="">
            <div class="div">
              <q-item-section>
                <i class="fa-solid fa-gear"></i>
              </q-item-section>

              <q-item-section>
                <h6 style="font-size: 15px; font-weight: 100">Configuracion</h6>
              </q-item-section>
            </div>
          </router-link>
    



        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="" style="height: 75px">
        <div class="absolute-bottom bg-transparent">
          <div class="profile-container">
            <router-link to="/Perfil">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </router-link>
            <div class="profile-info">
              <div class="text-weight-bold">{{ nombreUsuario }}</div>
              <div class="conten_rol">
                <i
                  class="fa fa-circle"
                  style="color: #0a8f0f; font-size: 10px"
                ></i>
                <div class="en_linea">{{ rolUsuario }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useusuariostore } from "../stores/Usuario.js";

const usuariostore = useusuariostore();
const $q = useQuasar();

function confirm() {
  $q.dialog({
    title: "Cerrar sesion",
    message: "¿Deseas cerrar sesion?",
    cancel: true,
    persistent: true,
    html: true,
    style: {
      width: "400px",
      borderRadius: "6px",
      padding: "10px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      fontSize: "18px",
      fontFamily: "save",
    },
    ok: {
      label: "Sí",
      color: "primary",
      push: true,
    },
    cancel: {
      label: "No",
      color: "negative",
      push: true,
    },
  })
    .onOk(() => {
      logoutUser();
      // goToHome();
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

const nombreUsuario = ref("");
const rolUsuario = ref("");
const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const checkAccess = (ruta) => {
  const usuariostore = useusuariostore();
  const usuarioLogeado = usuariostore.usuarioLogeado;
  if (!usuarioLogeado) return false;
  const rolUsuario = usuarioLogeado.Rol;
  const rolesPermitidos = {
    Home: ["admin", "bodega", "instructor"],
    TablaFichas: ["admin", "instructor"],
    TablaProductos: ["admin", "instructor"],
    TablaUsuarios: ["admin"],
    TablaArea: ["admin", "bodega", "instructor"],
    TablaLotes: ["admin", "bodega", "instructor"],
    TablaPedidos: ["admin", "bodega", "instructor"],
    Perfil: ["admin", "bodega", "instructor"],
    TablaHistorial: ["admin", "bodega", "instructor"],
    Contrato: ["admin", "bodega", "instructor"]
  };

  return rolesPermitidos[ruta].includes(rolUsuario);
};

const obtenerInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      console.error("No hay ningún token almacenado.");
      return;
    }
    usuariostore.setToken(token);
    const usuarioDataString = localStorage.getItem("usuarioData");
    if (usuarioDataString) {
      const usuarioData = JSON.parse(usuarioDataString);
      usuariostore.setUsuarioLogeado(usuarioData);
      if (usuarioData && usuarioData.Nombre) {
        nombreUsuario.value = usuarioData.Nombre;
      }
      if (usuarioData && usuarioData.Rol) {
        rolUsuario.value = usuarioData.Rol;
      }
    }
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
  }
};

onMounted(() => {
  obtenerInfo();
});

function goToHome() {
  console.log("Sesión cerrada. Redirigiendo a la página de inicio...");
  router.push("/");
}

function logoutUser() {
  usuariostore.logout();
  goToHome();
}
</script>

<style scoped>
.custom-header {
  background-color: #2e7d32 !important;
}

.profile-container {
  position: relative;
  top: 15px;
  display: flex;
  align-items: center;
}

.profile-info {
  text-align: end;
  margin-left: 20px;
}

.conten_rol {
  display: flex;
  align-items: center;
}

.en_linea {
  margin-left: 5px;
  font-size: 14px;
}

.btnlogout {
  margin-left: 10px;
  color: white;
  cursor: pointer;
}

.btnlogout:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}

.btnmenu:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}

.btnmenu {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0px 10px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}

.btnmenu i {
  margin: 0;
  padding: 0;
}

.list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "save";
  src: url("../fonts/Anta-Regular.ttf");
}

.list div {
  display: grid;
  grid-template-columns: 25% 75%;
  padding: 5px 0px;
  padding-left: 0;
  color: #ffffff;
  /* Color de texto para los elementos del menú */
  transition: background-color 0.3s ease;
  align-items: center;
}

.div:hover {
  background-color: #191e20;
  border-left: 5px solid #2e7d32 !important;
}

.div1 {
  height: 40px;
  background-color: #2b3638;
}

.text2 {
  position: relative;
  left: 20px;
  bottom: 5px;
  font-size: 10px;
  font-weight: 100;
  color: #788186;
}

.list a {
  text-decoration: none;
  color: #333;
  /* Color de texto para los enlaces */
}

.list div h6 {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  font-family: "save";
}

.list div i {
  font-size: 1.5rem;
  padding-left: 20px;
}

.body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

.btndispre {
  background: transparent;
  border: 0;
  color: white;
  font-family: "save";
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
}

.btndispre:hover {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
}
</style>
