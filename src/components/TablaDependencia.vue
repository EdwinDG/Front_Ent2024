<template>
  <div class="container">
    <!-- Tabla -->
    <div class="container-table">


      <div class="container2">
        <div class="tabladiv">
          <div class="header">
            <h5 class="title">Dependencias</h5>
            <button class="btnag" @click="agregar()">
              <h5>Agregar</h5>
              <i class="fa-regular fa-square-plus"></i>
            </button>
          </div>
          <q-table flat bordered class="tabla" :rows="rows" :filter="filter" :columns="columns" row-key="index"
            virtual-scroll :rows-per-page-options="[0]">
            <template v-slot:body-cell-Estado="props">
              <q-td :props="props">
                <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
              </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props" class="opciones">
                <button class="btnedit" @click="editararea(props.row._id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btninac" @click="inactivararea(props.row._id)" v-if="props.row.Estado == 1">
                  <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                </button>

                <button class="btnact" @click="activararea(props.row._id)" v-else>
                  <i class="fa-solid fa-check" style="color: #006110"></i>
                </button>
                <button class="btnedit" @click="goDisDependencia(props.row._id)">
                  <i class="fa-solid fa-arrow-right"></i>
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
                <h5 class="titulos">Agrgar dependencia</h5>
                <div class="linea"></div>
              </div>

              <q-card-section>

                <q-form class="q-gutter-md">
                  <div class="contenedor_modal">

                    <div class="modal_izquierdo"></div>
                    <div class="modal_derecho">
                      <div class="rectangulo">Informacion de dependencia</div>
                      <div class="container_input2">
                        <div class="container_input4">
                          <label class="label-input2" for="">Nombre:</label>
                          <q-input color="green" filled v-model="Nombre" class="modal_input3" type="text" label="Nombre *"
                            lazy-rules :rules="[
                              (val) => !!val || 'Por favor ingrese un nombre de area',
                            ]">
                            <template v-slot:prepend>
                              <i class="fa-solid fa-network-wired" aria-hidden="true"></i>
                            </template>
                          </q-input>
                        </div>

                      </div>
                      <div class="contenedor_botones">
                        <q-btn flat v-close-popup class="btnagregar1" type="reset" label="Cancelar" />
                        <q-btn label="Agregar" class="btnagregar2" @click="agregararea()" v-if="btnagregar"
                          type="submit" />
                        <q-btn label="Aceptar" class="btnagregar2" @click="agregararea()" v-if="btnaceptar"
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
import { useareastore } from "../stores/Area.js";
import { useRouter } from 'vue-router';

const router = useRouter();
/* const $q = useQuasar(); */
const areastore = useareastore();
let rows = ref([]);
let xd = ref(0);
/* let fixed = ref(false); */
const $q = useQuasar();
let Nombre = ref("");
const filter = ref("")
let areas = ref([]);
let text = ref("Agregar dependencia");
let btnaceptar = ref(false);
let btnagregar = ref(true);
let prompt = ref(false);
function agregar() {
  console.log("FDfsd");
  prompt.value = true;
  xd.value = 0;
  limpiar();
  text.value = "Agregar Area";
  btnaceptar.value = false;
  btnagregar.value = true;
}
// Filtrar Areas
/* function filtrarvendedores() {
    if (searchCedula.value.trim() === "") {
        rows.value = vendedores.value;
    } else {
        const searchTerm = searchCedula.value.trim().toLowerCase();
        rows.value = vendedores.value.filter((cliente) =>
            cliente.cedula.toString().toLowerCase().includes(searchTerm)
        );
    }
} */


function goDisDependencia(DependenciaLote_id){
  router.push(`/DistribucionLoteDependencia/${DependenciaLote_id}`);
}

let notification;
const columns = [
  {
    name: "Nombre",
    label: "Nombre",
    field: "Nombre",
    headerStyle: {
      fontWeight: "bold",
      fontSize: "15px",
    },
    align: "center",
  },
  {
    name: "Estado",
    label: "Estado",
    field: "Estado",

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
  Nombre.value = "";

}
async function agregararea() {
  if (xd.value == 0) {
    try {
      showDefault();
      await areastore.postinfoarea({
        Nombre: Nombre.value,
      });
      obtenerInfo();
      if (notification) {
        notification();
      }
      limpiar();
      $q.notify({
        spinner: false,
        message: "Area Agregada",
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
  } else {
    let id = idarea.value;
    if (id) {
      try {
        showDefault();
        await areastore.puteditararea(id, {
          Nombre: Nombre.value,
        });
        btnagregar.value = true;
        btnaceptar.value = false;
        text.value = "Agregar area";
        xd.value = 0;
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Area Actualizada",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
        prompt.value = false;
      } catch (error) {
        console.log("paila");
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

let idarea = ref("");
async function editararea(id) {
  prompt.value = true
  xd.value = 1;
  const areaseleccionada = areas.value.find((area) => area._id === id);
  if (areaseleccionada) {
    idarea.value = String(areaseleccionada._id);
    btnagregar.value = false;
    btnaceptar.value = true;
    text.value = "Editar Area";
    Nombre.value = areaseleccionada.Nombre;
    /* nombre.value = areaseleccionada.Nombre;
        niveldeformacion.value = areaseleccionada.NivelFormacion;
        area_id.value = {
            label: `${areaseleccionada.Area_Id.Nombre}`,
            value: String(areaseleccionada.Area_Id._id),
        };
        fechafin.value = format(new Date(areaseleccionada.FechaFin), "yyyy-MM-dd");
        fechainicio.value = format(
            new Date(areaseleccionada.FechaInicio),
            "yyyy-MM-dd"
        ); */
  }
}
async function obtenerInfo() {
  try {
    const response = await areastore.obtenerinfoarea();
    areas.value = areastore.area;
    rows.value = areastore.area;
  } catch (error) {
    console.log(error);
  }
}
async function inactivararea(id) {
  try {
    showDefault();
    await areastore.putinactivararea(id);
    cancelShow();
    greatMessage.value = "Area Inactiva";
    showGreat();
    obtenerInfo();
  } catch (error) {
    cancelShow();
    badMessage.value = error.response.data.error.errors[0].msg;
    showBad();
  }
}

async function activararea(id) {
  try {
    showDefault();
    await areastore.putactivararea(id);
    cancelShow();
    greatMessage.value = "Area Activa";
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
  background: #2e7d32!important;
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
  background-color: #2e7d32!important;
  width: 80%;
  border-bottom: 4px solid #2e7d32!important;
  border-left: 3px solid #2e7d32!important;
}

.modal_derecho {
  display: grid;
  background-color: #ffffff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.322);
  border-radius: 3px;
  width: 100%;
}

.container_input4 {
  display: flex;
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
  background-color: #2e7d32!important;
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



i {
  font-size: 20px;
}

.label-input2 {
  display: flex;
  position: relative;
  bottom: 15px;
  align-items: center;
  font-weight: 700;
  margin: 18px;
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