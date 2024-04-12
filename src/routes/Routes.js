import Login from "../components/Login.vue";
/* import InfoPerfil from "../components/InfoPerfil.vue"; */
import RecuContrasena from "../components/RecuContrasena.vue";
/* import Registro from "../components/Registro.vue"; */
import Perfil from "../components/Perfil.vue";
import TablaProductos from "../components/TablaProducto.vue";
import TablaFichas from "../components/TablasFichas.vue";
import TablaArea from "../components/TablaDependencia.vue";
import TablaLotes from "../components/TablaLote.vue";
import TablaUsuarios from "../components/TablaUsuarios.vue";
/* import RolDeCuenta from "../components/RolDeCuenta.vue"; */
import Home from "../components/Home.vue";
import TablaHistorial from "../components/TablaHistorial.vue";
import Menu from "../layout/Menu.vue";
import TablaPedidos from "../components/TablaPedidos.vue";
import ItemPresupuesto from "../components/ItemPresupuesto.vue";
import DistribucionPresupuesto from "../components/DistribucionPresupuesto.vue";
import CodigoRecuperar from "../components/CodigoRecuperar.vue";
import Nuevacontrasena from "../components/NuevaContrasena.vue";
import Contrato from "../components/Contrato.vue";
import DistribucionLoteDependencia from "../components/DistribucionLoteDependencia.vue";
import { useusuariostore } from "../stores/Usuario";
import Red_conocimiento from "../components/Red_conocimiento.vue";


import { createRouter, createWebHashHistory } from "vue-router";

const auth = async (to, from, next) => {
  const usuariostore = useusuariostore();

  console.log("Verificando autenticación y roles...");

  await usuariostore.obtenerinfousuario();

  if (usuariostore.tokenRef && usuariostore.usuarioLogeado) {
    const rol = usuariostore.usuarioLogeado.Rol;
    if (!to.meta.rol.includes(rol)) {
      console.warn("Usuario no autorizado para acceder a esta ruta: ", to.path);
      return next({ name: "login" });
    }
    console.log(
      "Autenticación y roles verificados. Permitiendo acceso a la ruta:",
      to.path
    );
    return next();
  }
  console.warn("Usuario no autenticado. Redirigiendo al inicio de sesión...");
  return next({ name: "login" });
};

const routes = [
  { path: "/", component: Login, name: "login" },
  { path: "/RecuContrasena", component: RecuContrasena },
  { path: "/CodigoRecuperar", component: CodigoRecuperar },
  { path: "/NuevaContrasena", component: Nuevacontrasena },

  {
    path: "/Menu",
    component: Menu,
    children: [
      {
        path: "/Home",
        component: Home,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      /*  { path: "/InfoPerfil", component: InfoPerfil }, */
      /* { path: "/Registro", component: Registro }, */
      {
        path: "/Perfil",
        component: Perfil,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      {
        path: "/TablaProductos",
        component: TablaProductos,
        beforeEnter: auth,
        meta: { rol: ["admin", "instructor"] },
      },
      {
        path: "/TablaFichas",
        component: TablaFichas,
        beforeEnter: auth,
        meta: { rol: ["admin", "instructor"] },
      },
      {
        path: "/TablaArea",
        component: TablaArea,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      {
        path: "/TablaUsuarios",
        component: TablaUsuarios,
        beforeEnter: auth,
        meta: { rol: ["admin"] },
      },
      {
        path: "/TablaLotes",
        component: TablaLotes,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      {
        path: "/TablaHistorial",
        component: TablaHistorial,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      /*     { path: "/RolDeCuenta", component: RolDeCuenta }, */
      {
        path: "/TablaPedidos",
        component: TablaPedidos,
        beforeEnter: auth,
        meta: { rol: ["admin", "bodega", "instructor"] },
      },
      {
        path: "/ItemPresupuesto",
        component: ItemPresupuesto,
        beforeEnter: auth,
        meta: { rol: ["admin", "instructor"] },
      },
      {
        path: "/DistribucionPresupuesto",
        component: DistribucionPresupuesto,
        beforeEnter: auth,
        meta: { rol: ["admin", "instructor"] },
      },
      {
        path: "/DistribucionLoteDependencia",
        component: DistribucionLoteDependencia,
        beforeEnter: auth,
        meta: { rol: ["admin", "instructor"] },
      },
      {
        path: "/Contrato",
        component: Contrato,
        beforeEnter: auth,
        meta: { rol: ["admin"] },
      },
      {
        path: "/Red_conocimiento",
        component: Red_conocimiento,
        beforeEnter: auth,
        meta : { rol: ["admin"]},
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
