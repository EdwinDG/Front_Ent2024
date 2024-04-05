<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <div class="spinner-container" v-if="cargando">
        <q-spinner-hourglass size="100px" color="light-green" />
        <p class="p-carga">Cargando...</p>
      </div>

      <div class="container2" v-else>
        <div class="tabladiv">
          <div class="header">
            <h5 class="title">Pedidos</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>

          <q-table flat bordered title="" class="tabla" :rows="rows" :filter="filter" :columns="columns" row-key="index"
            virtual-scroll :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td class="opciones" :props="props">
                <button class="btnedit" @click="editarPedido(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btninac" @click="inactivarpedido(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button class="btnact" @click="activarpedido(props.row._id)" v-else>
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
              </q-td>
            </template>
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" color="primary" v-model="filter" class="buscar"
                placeholder="Buscar cualquier campo" id="boxBuscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>




          <q-dialog v-model="prompt" persistent class="containermodal">
            <q-card class="modal">
              <div class="titulo-linea">
                <i class="fa-solid fa-pen-to-square" id="tta"></i>
                <h5 class="titulos">{{ text }}</h5>
              </div>


              <q-card-section>

                <q-form class="q-gutter-md">
                  <div class="contenedor_modal">
                    <div class="modal_izquierdo"></div>
                    <div class="modal_derecho">
                      <div class="rectangulo">Informacion de producto</div>
                      <div class="container_input2">

                        <div class="container_input3">
                          <label class="label-input" for="">Fecha de creacion:</label>
                          <q-input color="green" filled v-model="FechaCreacion" class="modal_input2" type="date"
                            lazy-rules :rules="[(val) => !!val || 'Por favor ingrese la fecha de creacion']">
                            <template v-slot:prepend>
                              <i class="fa fa-calendar" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for="">Fecha de entrega:</label>
                          <q-input color="green" filled v-model="FechaEntrega" class="modal_input2" type="date"
                            lazy-rules :rules="[(val) => !!val || 'Por favor ingrese la fecha de entrega']">
                            <template v-slot:prepend>
                              <i class="fa fa-calendar" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for="">Precio:</label>
                          <q-input color="green" filled type="number" v-model="Total" class="modal_input2" lazy-rules
                            :rules="[
                              (val) =>
                                (val !== null && val !== '') ||
                                'Por favor ingresar el precio ',
                              (val) =>
                                val > 0 || 'Por favor ingresar un número válido mayor a 0',
                            ]">
                            <template v-slot:prepend>
                              <i class="fa fa-usd" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for="">Entregado:</label>
                          <q-select color="green" filled v-model="Entregado" :options="opcions2" class="modal_input2"
                            type="text" lazy-rules :rules="[
                              (val) => !!val || 'Por favor ingrese la confirmacion',
                            ]" hide-bottom-space>
                            <template v-slot:prepend>
                              <i class="fa fa-truck" aria-hidden="true"></i>
                            </template>
                          </q-select>
                        </div>
                      </div>

                      <div class="container_input4">
                        <label class="label-input2" for="">Usuario:</label>
                        <q-input color="green" filled v-model="Usuario_Id" class="modal_input3" type="text"
                          label="Usuario *" lazy-rules :rules="[
                            (val) => !!val || 'Por favor ingrese el usuario',
                          ]">
                          <template v-slot:prepend>
                            <i class="fa fa-user" aria-hidden="true"></i>
                          </template>
                        </q-input>
                      </div>

                      <div class="container_input2">

                        <div class="container_input3">
                          <label class="label-input3" for="">Ficha:</label>
                          <q-select color="green" filled v-model="Ficha_Id" :options="options" class="modal_input2" type="text" lazy-rules
                            :rules="[
                              (val) => !!val || 'Por favor ingrese la ficha',
                            ]" hide-bottom-space>
                            <template v-slot:prepend>
                              <i class="fa fa-cogs" aria-hidden="true"></i>
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <div class="contenedor_botones">
                        <q-btn flat v-close-popup class="btnagregar1" type="reset" label="Cancelar" />
                        <q-btn label="Agregar" class="btnagregar2" @click="agregarpedido()" v-if="btnagregar"
                          type="submit" />
                        <q-btn label="Aceptar" class="btnagregar2" @click="agregarpedido()" v-if="btnaceptar"
                          type="submit" />
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { usepedidostore } from "../stores/Pedido.js";
import { format } from "date-fns";
import { useusuariostore } from "../stores/Usuario.js";
import { usefichastore } from "../stores/Fichas.js";

const $q = useQuasar();
const pedidostore = usepedidostore();
const usuariostore = useusuariostore();
const fichastore = usefichastore();


async function obtenerFichas() {
  try {
    await fichastore.obtenerinfoficha();
    options.value = fichastore.fichas.map((fichas) => ({
      label: `${fichas.Nombre} `,
      value: String(fichas._id),
    }));
  } catch (error) {
    console.log(error);
  }
}

let notification;
let rows = ref([]);
let pedidos = ref([]);
let prompt = ref(false);

const filter = ref("")
const options = ref([]);
let FechaCreacion = ref("");
let Ficha_Id = ref("");
let FechaEntrega = ref("");
let Usuario_Id = ref("");
let Entregado = ref("");
let Total = ref("");
let idPedido = ref("");
let text = ref("Agregar Pedidos");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let xd = ref(0);
function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar Pedidos";
  btnaceptar.value = false;
  btnagregar.value = true;
}
const cargando = ref(false);

const opcions2 = ref([
  { label: "Si Entregado" },
  { label: "No Entregado" }
  ,

])

const columns = [
  {
    name: "FechaCreacion",
    label: "Fecha de creacion",
    align: "center",
    format: (val) => format(new Date(val), "yyyy-MM-dd"),
    field: "FechaCreacion",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "FechaEntrega",
    label: "Fecha de entrega",
    align: "center",
    field: "FechaEntrega",
    format: (val) => format(new Date(val), "yyyy-MM-dd"),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Entregado",
    label: "Entregado",
    align: "center",
    field: "Entregado",

    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Usuario_Id",
    label: "Usuario_Id",
    align: "center",
    field: "Usuario_Id",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Ficha_Id",
    label: "Ficha_Id",
    align: "center",
    field: "Ficha_Id",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Entregado",
    label: "Entregado",
    align: "center",
    field: "Entregado",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Total",
    label: "Total",
    align: "center",
    field: "Total",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Estado",
    label: "Estado",
    align: "center",
    field: "Estado",
    sortable: true,
    format: (val) => (val ? "Activo" : "Inactivo"),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "opciones",
    label: "Opciones",
    align: "center",
    field: (row) => null,
    sortable: false,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
];

async function obtenerInfo() {
  try {
    cargando.value = true;
    obtenerFichas()
    const response = await pedidostore.obtenerinfopedido();
    console.log(response);
    pedidos.value = pedidostore.pedido;
    rows.value = pedidostore.pedido;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

async function agregarpedido() {
  if (xd.value == 0) {
    try {
      showDefault();
      await pedidostore.postinfopedido({
        FechaCreacion: FechaCreacion.value,
        FechaEntrega: FechaEntrega.value,
        Usuario_Id: Usuario_Id.value,
        Ficha_Id: Ficha_Id.value,
        Entregado: Entregado.value,
        Total: Total.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "pedido Agregado",
        timeout: 2000,
        type: "positive",
      });
    } catch (error) {
      if (notification) {
        notification();
      }
      $q.notify({
        spinner: false,
        message: `${error.response.data.error.errors[0].msg}`,
        timeout: 2000,
        type: "negative",
      });
    }
  } else {
    let id = idPedido.value;
    if (id) {
      try {
        showDefault();
        await pedidostore.puteditarpedido(id, {
          FechaCreacion: FechaCreacion.value,
          FechaEntrega: FechaEntrega.value,
          Usuario_Id: Usuario_Id.value,
          Ficha_Id: Ficha_Id.value,
          Entregado: Entregado.value,
          Total: Total.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar Pedido";

        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Pedido Actualizada",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
        prompt.value = false;
      } catch (error) {
        if (notification) {
          notification();
        }
        $q.notify({
          spinner: false,
          message: `${error.response.data.error.errors[0].msg}`,
          timeout: 2000,
          type: "negative",
        });
      }
    }
  }
}

function limpiar() {
  FechaCreacion.value = "";
  FechaEntrega.value = "";
  Usuario_Id.value = "";
  Ficha_Id.value = "";
  Total.value = "";
  Entregado.value = "";
}

async function editarPedido(id) {
  prompt.value = true;
  xd.value = 1;
  const selecpedido = pedidos.value.find((pedidoTT) => pedidoTT._id === id);
  if (selecpedido) {
    idPedido.value = String(selecpedido._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar pedido";
    FechaCreacion.value = format(
      new Date(selecpedido.FechaCreacion),
      "yyyy-MM-dd"
    );
    FechaEntrega.value = format(
      new Date(selecpedido.FechaEntrega),
      "yyyy-MM-dd"
    );
    Usuario_Id.value = selecpedido.Usuario_Id;
    Ficha_Id.value = selecpedido.Ficha_Id;
    Entregado.value = selecpedido.Entregado;
    Total.value = selecpedido.Total;
  }
}

// Inactivar pedido
async function inactivarpedido(id) {
  try {
    showDefault();
    await pedidostore.putinactivarpedido(id);
    cancelShow();
    greatMessage.value = "Pedido Inactivo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar pedido
async function activarpedido(id) {
  try {
    showDefault();
    await pedidostore.putactivarpedido(id);
    cancelShow();
    greatMessage.value = "Pedido Activo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

let greatMessage = ref("");
let badMessage = ref("");

// Notificacion Buena
const showGreat = () => {
  notification = $q.notify({
    spinner: false,
    message: greatMessage,
    timeout: 2000,
    type: "positive",
  });
};

// Notificacion Mala
const showBad = () => {
  notification = $q.notify({
    spinner: false,
    message: badMessage,
    timeout: 2000,
    type: "negative",
  });
};

// Notificacion de Carga
const showDefault = () => {
  notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
  });
};

// Cancelar Notificacion
const cancelShow = () => {
  if (notification) {
    notification();
  }
};

onMounted(async () => {
  obtenerInfo();
});
</script>

<style scoped>
/* Estilos generales */
* {
  color: black;
}

body {
  background: linear-gradient(to top, rgba(162, 211, 162, 0.774), white);
}

/* Estilos de la tabla */
.container-table {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container2 {
  margin-top: 95px;
  width: 80%;
}

.tabla {
  border-radius: 0px 15px 15px 15px;
  width: 100%;
}

.header {
  display: flex;
  align-items: flex-end;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin: 0;
  padding: 16px 0px;
  background-color: #21ba45;
  font-weight: bold;
  width: 20%;
  margin-left: 0px;
  border-radius: 10px 10px 0px 0px;
}

.btnag {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  height: 45px;
  border: 0;
  border-radius: 0px 7px 0px 0px;
  cursor: pointer;
  background-color: rgb(227, 227, 227);
}

.btnag:hover {
  background-color: rgb(209, 209, 209);
}

.btnag h5 {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
}

/* Estilos del formulario modal */
.q-gutter-md {
  color: black;
}

.contenedor_modal {
  display: flex;
}



.rectangulo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  flex-wrap: wrap;
  bottom: 3px;
  margin-left: auto;
  margin-right: auto;
  height: 45px;
  background-color: #21ba45;
  width: 80%;
  border-bottom: 4px solid #21ba45;
  border-left: 3px solid #21ba45;
}

.modal_derecho {
  display: grid;
  background-color: #ffffff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.322);
  border-radius: 3px;
  width: 100%;
}


.container_input2 {
  display: flex;
  flex-wrap: wrap;
}

.container_input3 {
  display: flex;
  width: 45%;
  margin: 10px;
}

.container_input4 {
  display: flex;
}

.modal_input2 {
  display: flex;
  margin: 0;
  width: 100%;
}


.modal_input3 {
  width: 80%;
}

.modal {
  width: 100%;
  background-color: #ecf0f5;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 15px;
}

.titulo-linea {
  margin-bottom: 20px;
  background-color: #21ba45;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.322);
  display: flex;
  margin: 0;
}

#tta {
  font-size: 24px;
  color: #ffffff;
  margin: 20px;
}

.titulos {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 20px;
}

.label-input {
  display: flex;
  position: relative;
  bottom: 15px;
  align-items: center;
  font-weight: 700;
  width: 30%;
  margin: 10px;
}

i {
  font-size: 15px;
  color: #4a4b4a;
}

.label-input2 {
  display: flex;
  position: relative;
  bottom: 15px;
  align-items: center;
  font-weight: 700;
  margin: 18px;
}

.label-input3 {
  display: flex;
  text-align: end;
  align-items: center;
  font-weight: 700;
  width: 30%;
  margin: 10px;
}


.contenedor_botones {
  display: flex;
  height: 50px;
  justify-content: space-between;
}




/* Estilos de los botones de acción en la tabla */
.opciones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.acciones {
  font-size: 10px;
  font-weight: 500;
  padding: 2px;
}

.acciones2 {
  background-color: #8d8d8d28;
}

.acciones3 {
  display: flex;
}

i {
  margin-right: 10px;
}

.btnedit {
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btninac,
.btnact {
  font-size: 23px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.btninac {
  background-color: rgb(255, 186, 186);
}

.btninac:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(237, 179, 179);
}

.btnagregar2 {
  border: 1px solid #cacecb;
  margin: 10px;
  background-color: #dfdbdb8c;
}

.btnagregar2:hover {
  border: 1px solid #acd6b6;
  background-color: #b3b2b28c;
}

.btnagregar1:hover {
  border: 1px solid #d6acac;
  background-color: #b3b2b28c;
}

.btnagregar1 {
  border: 1px solid #dfdfdf;
  margin: 10px;
  background-color: #dfdbdb8c;
}

.btnact {
  background-color: rgb(167, 255, 167);
}

.btnact:hover {
  transform: scale(1.1);
  transition: ease-in-out 0.4s;
  background-color: rgb(71, 243, 71);
}

/* Otros estilos */

.spinner-container {
  display: grid;
  align-items: center;
  justify-content: center;
}

.p-carga {
  text-align: center;
}

@media only screen and (max-width: 900px) {
  .container_input3 {
    width: 100%;
    flex-wrap: wrap;
  }

  .container_input4 {
    display: flex;
    flex-wrap: wrap;
  }

  .modal_input3 {
    width: 97%;
  }

  .contenedor_modal {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media only screen and (max-width: 768px) {
  .container2 {
    margin-top: 50px;
  }


}


/* Estilos específicos para pantallas más grandes */
@media only screen and (min-width: 1200px) {
  .container2 {
    margin-top: 120px;
  }

  .modal_input2 {
    width: 100%;
  }
}
</style>

