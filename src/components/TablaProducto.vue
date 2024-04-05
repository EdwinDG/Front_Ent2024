<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">
      <div class="spinner-container" v-if="cargando">
        <q-spinner-hourglass size="100px" color="light-green" />
        <p class="p-carga">Cargando..</p>
      </div>

      <div class="container2" v-else>
        <div class="tabladiv">
          <div class="header">
            <h5 class="title">Productos</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>

          <q-table
            flat
            bordered
            title=""
            class="tabla"
            :rows="rows"
            :filter="filter"
            :columns="columns"
            row-key="index"
            virtual-scroll
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label
                  for=""
                  v-if="props.row.Estado == 1"
                  style="color: green; font-weight: bold"
                  >Activo</label
                >
                <label for="" v-else style="color: red; font-weight: bold"
                  >Inactivo</label
                >
              </q-td>
            </template>

            <template v-slot:body-cell-opciones="props">
              <q-td class="opciones" :props="props">
                <q-btn-dropdown class="acciones" label="Acciones">
                  <q-list>
                    <q-item
                      class="acciones2"
                      clickable
                      v-close-popup
                      @click="editarProducto(props.row._id, 'Editar')"
                    >
                      <div class="acciones3">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <q-item-label>Editar</q-item-label>
                      </div>
                    </q-item>

                    <q-item
                      class="acciones2"
                      clickable
                      v-close-popup
                      @click="inactivarProducto(props.row._id)"
                      v-if="props.row.Estado == 1"
                    >
                      <div class="acciones3">
                        <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                        <q-item-label>Desactivar</q-item-label>
                      </div>
                    </q-item>

                    <q-item
                      class="acciones2"
                      clickable
                      v-close-popup
                      @click="activarProducto(props.row._id)"
                      v-else
                    >
                      <div class="acciones3">
                        <i class="fa-solid fa-check" style="color: #13ec37"></i>
                        <q-item-label>Activar</q-item-label>
                      </div>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>

            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                color="primary"
                v-model="filter"
                class="buscar"
                placeholder="Buscar cualquier campo"
                id="boxBuscar"
              >
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
                    <div class="modal_derecho">
                      <div class="rectangulo">Informacion de producto</div>
                      <div class="container_input2">
                        <div class="container_input3">
                          <label class="label-input" for="">Codigo:</label>
                          <q-input
                            color="green"
                            filled
                            v-model="Codigo"
                            class="modal_input2"
                            type="number"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'Por favor ingrese un código',
                            ]"
                          >
                            <template v-slot:prepend>
                              <i class="fa fa-code" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for="">Nombre:</label>
                          <q-input
                            color="green"
                            filled
                            v-model="Nombre"
                            class="modal_input2"
                            type="text"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'Por favor ingrese un nombre',
                            ]"
                          >
                            <template v-slot:prepend>
                              <i
                                class="fa fa-user-circle"
                                aria-hidden="true"
                              ></i>
                            </template>
                          </q-input>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for=""
                            >Unidad de Medida:</label
                          >
                          <div class="q-gutter-sm">
                            <q-select
                              color="green"
                              filled
                              v-model="unidadSeleccionada"
                              :options="opcionesUnidades"
                              input-debounce="300"
                              clearable
                              emit-value
                              map-options
                              option-value="value"
                              class="modal_input2"
                              @filter="handleFilter"
                              editable
                            >
                              <template v-slot:prepend>
                                <i
                                  class="fa fa-arrows-h"
                                  aria-hidden="true"
                                ></i>
                              </template>
                              <template v-slot:no-option>
                                <q-input
                                  v-model="unidadSeleccionada"
                                  placeholder="Ingrese una nueva unidad de medida"
                                  dense
                                  color="green"
                                  filled
                                  :rules="[
                                    (val) =>
                                      !!val ||
                                      'Por favor ingrese una unidad de medida',
                                  ]"
                                  class="modal_input2"
                                >
                                  <template v-slot:prepend>
                                    <i
                                      class="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </template>
                                </q-input>
                              </template>
                            </q-select>
                          </div>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for=""
                            >Precio de unidad:</label
                          >
                          <q-input
                            color="green"
                            filled
                            type="number"
                            v-model="PrecioUnitario"
                            class="modal_input2"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val !== null && val !== '') ||
                                'Por favor ingresar el precio unitario',
                              (val) =>
                                val > 0 ||
                                'Por favor ingresar un número válido mayor a 0',
                            ]"
                          >
                            <template v-slot:prepend>
                              <i class="fa fa-usd" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>
                      </div>

                      <div class="container_input4">
                        <label class="label-input2" for="">Descripcion:</label>
                        <q-input
                          color="green"
                          filled
                          v-model="Descripcion"
                          class="modal_input3"
                          type="textarea"
                          label="Descripcion *"
                          lazy-rules
                          :rules="[
                            (val) =>
                              !!val ||
                              'Por favor ingrese la descripcion del producto',
                          ]"
                        >
                          <template v-slot:prepend>
                            <i class="fa fa-align-left" aria-hidden="true"></i>
                          </template>
                        </q-input>
                      </div>

                      <div class="container_input2">
                        <div class="container_input3">
                          <label class="label-input3" for="">Consumible:</label>
                          <q-select
                            color="green"
                            filled
                            v-model="Consumible"
                            :options="consumible"
                            class="modal_input2"
                            type="text"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val ||
                                'Por favor ingrese un Consumible de producto',
                            ]"
                            hide-bottom-space
                          >
                            <template v-slot:prepend>
                              <i class="fa fa-cogs" aria-hidden="true"></i>
                            </template>
                          </q-select>
                        </div>

                        <div class="container_input3">
                          <label class="label-input3" for="">Lote:</label>
                          <q-select
                            color="green"
                            filled
                            v-model="Lote_Id"
                            class="modal_input2"
                            type="text"
                            :options="options"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val ||
                                'Por favor seleccione el lote al que pertenece',
                            ]"
                            hide-bottom-space
                          >
                            <template v-slot:prepend>
                              <i class="fa fa-th" aria-hidden="true"></i>
                            </template>
                          </q-select>
                        </div>

                        <div class="container_input3">
                          <label class="label-input" for="">Iva:</label>
                          <q-input
                            color="green"
                            filled
                            v-model="Iva"
                            class="modal_input2"
                            type="text"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val ||
                                'Por favor ingrese el iva del producto',
                            ]"
                          >
                            <template v-slot:prepend>
                              <i class="fa fa-percent"></i>
                            </template>
                          </q-input>
                        </div>
                      </div>

                      <div class="contenedor_botones">
                        <q-btn
                          flat
                          v-close-popup
                          class="btnagregar1"
                          type="reset"
                          label="Cancelar"
                        />
                        <q-btn
                          label="Agregar"
                          class="btnagregar2"
                          @click="agregarProducto()"
                          v-if="btnagregar"
                          type="submit"
                        />
                        <q-btn
                          label="Aceptar"
                          class="btnagregar2"
                          @click="agregarProducto()"
                          v-if="btnaceptar"
                          type="submit"
                        />
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
import { watchEffect } from "vue";
/* import { useRouter } from "vue-router"; */
import { useproductostore } from "../stores/Producto.js";
import { uselotestore } from "../stores/Lote.js";
const $q = useQuasar();
const productostore = useproductostore();
const lotestore = uselotestore();
const options = ref([]);
const fileInput = ref(null);
const imageUrl = ref("");

let notification;
let rows = ref([]);
let productos = ref([]);
let prompt = ref(false);
const consumible = ref([{ label: "Si" }, { label: "No" }]);
let Nombre = ref("");
let Codigo = ref("");
let Descripcion = ref("");
let UnidadMedida = ref("");
let PrecioUnitario = ref("");
let Iva = ref("");
let Consumible = ref("");
let Lote_Id = ref("");
const filter = ref("");
let idProducto = ref("");
let text = ref("Agregar producto");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let xd = ref(0);

const opcionesUnidades = ref([
  { label: "Kilogramo", value: "kg" },
  { label: "Litro", value: "l" },
  { label: "Metro", value: "m" },
]);

const unidadSeleccionada = ref(null);
const unidadMedida = ref("");

watchEffect(() => {
  if (unidadSeleccionada.value) {
    unidadMedida.value = "";
  }
});

function agregar() {
  prompt.value = true;
  xd.value = 0;
  eliminarImagen();
  limpiar();
  text.value = "Agregar producto";
  btnaceptar.value = false;
  btnagregar.value = true;
}
const cargando = ref(false);

const columns = [
  {
    name: "Codigo",
    label: "Codigo",
    align: "center",
    field: "Codigo",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Nombre",
    label: "Nombre",
    align: "center",
    field: "Nombre",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Descripcion",
    label: "Descripcion",
    align: "center",
    field: "Descripcion",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "UnidadMedida",
    label: "Unidad de medida",
    align: "center",
    field: "UnidadMedida",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "PrecioUnitario",
    label: "Precio unitario",
    align: "center",
    field: "PrecioUnitario",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
    format: (val) => formatearPrecio(val),
  },
  {
    name: "Iva",
    label: "Iva",
    align: "center",
    field: "Iva",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Consumible",
    label: "Consumible",
    align: "center",
    field: (val) => (val.Consumible == true ? "Sí" : "No"),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Lote_Id",
    label: "Lote",
    align: "center",
    field: (row) => `${row.Lote_Id?.Nombre}`,
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
    const response = await productostore.obtenerinfoproducto();
    console.log(productostore.producto);
    productos.value = productostore.producto;
    rows.value = productostore.producto;
    obtenerlote();
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

async function agregarProducto() {
  if (xd.value == 0) {
    try {
      console.log("a");
      showDefault();
      console.log(Consumible.value);
      await productostore.postinfoproducto({
        Codigo: Codigo.value,
        Nombre: Nombre.value,
        Descripcion: Descripcion.value,
        UnidadMedida: UnidadMedida.value,
        PrecioUnitario: PrecioUnitario.value,
        Iva: Iva.value,
        Consumible: Consumible.value.label == "Si",
        Lote_Id: Lote_Id._rawValue.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Producto Agregado",
        timeout: 2000,
        type: "positive",
      });
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
  } else {
    let id = idProducto.value;
    if (id) {
      try {
        showDefault();
        await productostore.puteditarproducto(id, {
          Codigo: Codigo.value,
          Nombre: Nombre.value,
          Descripcion: Descripcion.value,
          UnidadMedida: UnidadMedida.value,
          PrecioUnitario: PrecioUnitario.value,
          Iva: Iva.value,
          Consumible: Consumible.value.label == "Si",
          Lote_Id: Lote_Id._rawValue.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar Producto";

        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Producto Actualizada",
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
  Codigo.value = "";
  Nombre.value = "";
  Descripcion.value = "";
  UnidadMedida.value = "";
  PrecioUnitario.value = "";
  Iva.value = "";
  Consumible.value = "";
  Lote_Id.value = "";
}

async function editarProducto(id) {
  prompt.value = true;
  xd.value = 1;
  const selecProducto = productos.value.find(
    (productoTT) => productoTT._id === id
  );
  console.log(selecProducto);
  if (selecProducto) {
    idProducto.value = String(selecProducto._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar producto";
    Codigo.value = selecProducto.Codigo;
    Nombre.value = selecProducto.Nombre;
    Descripcion.value = selecProducto.Descripcion;
    UnidadMedida.value = selecProducto.UnidadMedida;
    PrecioUnitario.value = selecProducto.PrecioUnitario;
    Iva.value = selecProducto.Iva;
    Consumible.value = selecProducto.Consumible ? "Si" : "No";
    Lote_Id.value = {
      label: `${selecProducto.Lote_Id.Nombre}`,
      value: String(selecProducto.Lote_Id._id),
    };
  }
}
async function obtenerlote() {
  try {
    await lotestore.obtenerinfolote();
    options.value = lotestore.lote.map((lote) => ({
      label: `${lote.Nombre} `,
      value: String(lote._id),
    }));
  } catch (error) {
    console.log(error);
  }
}
// Inactivar producto
async function inactivarProducto(id) {
  try {
    showDefault();
    await productostore.putInactivarproducto(id);
    cancelShow();
    greatMessage.value = "Producto Inactivo";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar producto
async function activarProducto(id) {
  try {
    showDefault();
    await productostore.putActivarproducto(id);
    cancelShow();
    greatMessage.value = "Producto Activo";
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

const formatearPrecio = (precio) => {
  const partes = precio.toString().split(/(?=(?:\d{3})+(?:\.|$))/);
  return partes.join(".");
};

const openFileExplorer = () => {
  fileInput.value.click();
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const eliminarImagen = () => {
  imageUrl.value = "";
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

.modal_izquierdo {
  background-color: #ffffff;
  border-radius: 10px;
  border-top: 2px solid #21ba45;
  border-bottom: 2px solid #21ba45;
  width: 250px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
  margin: 0 10px 0 10px;
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
