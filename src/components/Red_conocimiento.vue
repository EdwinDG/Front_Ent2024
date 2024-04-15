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
            <h5 class="title">Red Conocimiento</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>

          <q-table
            class="tabla"
            flat
            bordered
            :rows="rows"
            :filter="filter"
            :columns="columns"
            row-key="index"
            virtual-scroll
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-NivelFormacion="props">
              <q-td :props="props">
                {{ props.row.NivelFormacion.label }}
              </q-td>
            </template>
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
                <button class="btnedit" @click="puteditared(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  class="btninac"
                  @click="inactivarredconocimiento(props.row._id)"
                  v-if="props.row.Estado == 1"
                >
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>
                <button
                  class="btnact"
                  @click="activarredconocimiento(props.row._id)"
                  v-else
                >
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
                <!-- Ir a otra pagina con boton id  -->
                <button class="btnedit" @click="goRed_lote(props.row._id)">
                  Red-Lote
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
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
                      <div class="rectangulo">Informacion de Red conocimiento</div>
                      <div class="container_input2">
                        <div class="container_input3">
                          <label class="label-input" for="">Nombre:</label>
                          <q-input
                            color="green"
                            filled
                            v-model="nombre"
                            class="modal_input2"
                            type="text"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val ||
                                'Por favor ingrese el nombre de la red de conocimiento',
                            ]"
                          >
                            <template v-slot:prepend>
                              <i class="fa-solid fa-users-line" aria-hidden="true"></i>
                            </template>
                          </q-input>
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
                            @click="agregarRed_conocimiento()"
                            v-if="btnagregar"
                            type="submit"
                          />
                          <q-btn
                            label="Aceptar"
                            class="btnagregar2"
                            @click="agregarRed_conocimiento()"
                            v-if="btnaceptar"
                            type="submit"
                          />
                        </div>
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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useredstores } from "../stores/Red_conocimiento.js";
import helpers from "../helpers/General.js";
//Ir a otra pagina con boton id
import { useRouter } from "vue-router";
const router = useRouter();

const redstores = useredstores();
const options = ref([]);
const $q = useQuasar();
const fileInput = ref(null);
const imageUrl = ref("");

let notification;

let nombre = ref("");
const filter = ref("");
let text = ref("Agregar Red conocimiento");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let prompt = ref(false);
const cargando = ref(false);

onMounted(async () => {
  getInfo();
});

function agregar() {
  prompt.value = true;
  xd.value = 0;
  limpiar();
  eliminarImagen();
  text.value = "Agregar Red_conocimeinto";
  btnaceptar.value = false;
  btnagregar.value = true;
}

let rows = ref([]);
let red_conocimiento = ref([]);
let xd = ref(0);

const columns = [
  {
    name: "Nombre",
    label: "Nombre",
    field: (val) => helpers.primeraMayus(val.Nombre),
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },

  {
    name: "opciones",
    label: "Opciones",
    field: (row) => null,
    sortable: false,
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
];

function limpiar() {
  nombre.value = "";
}
//Ir a otra pagina con boton id
function goRed_lote(Red_loteid) {
  router.push(`/Red_Lote/${Red_loteid}`);
}

async function agregarRed_conocimiento() {
  if (xd.value == 0) {
    try {
      showDefault();
      await redstores.postinfored({
        Nombre: nombre.value,
      });
      getInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Red de conocimieto agregado Agregado",
        timeout: 2000,
        type: "positive",
      });
      getInfo();
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
    let id = idred_conocimiento.value;
    if (id) {
      try {
        showDefault();
        await redstores.puteditared(id, {
          Nombre: nombre.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar Red de conocimiento";
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Red de conocimiento Actualizada",
          timeout: 2000,
          type: "positive",
        });
        getInfo();
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

let idred_conocimiento = ref("");

async function puteditared(id) {
  prompt.value = true;
  xd.value = 1;
  const red_conocimientoseleccionada = rows.value.find(
    (editarred) => editarred._id === id
  );
  if (red_conocimientoseleccionada) {
    idred_conocimiento.value = String(red_conocimientoseleccionada._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar Red de conocimiento";
    nombre.value = red_conocimientoseleccionada.Nombre;
    console.log("Hola soy editar");
  }
}

async function getInfo() {
  try {
    cargando.value = true;
    console.log("a", redstores);
    const response = await redstores.obtenerifrored();
    console.log("hola soy redes", response);

    rows.value = redstores.Red_conocimiento;
  } catch (error) {
    console.log(error);
  } finally {
    cargando.value = false;
  }
}

// Inactivar red_conocimiento
async function inactivarredconocimiento(id) {
  try {
    showDefault();
    await redstores.putinactivarred(id);
    cancelShow();
    greatMessage.value = "red_conocimiento Inactiva";
    showGreat();
    getInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

// Activar red_conocimiento
async function activarredconocimiento(id) {
  try {
    showDefault();
    await redstores.putactivarred(id);
    cancelShow();
    greatMessage.value = "red_conocimiento Activa";
    showGreat();
    getInfo();
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
  margin: 0px 0px 20px;
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
  font-size: 20px;
}

.label-input2 {
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 0px 65px 0px 20px;
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

.btnedit {
  font-size: 20px;
  width: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
}

i {
  margin: 0;
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
