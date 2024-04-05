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
              <h5 class="title">Contrato</h5>
              <button class="btnag" @click="agregar()">
                <h5>Agregar</h5>
                <i class="fa-regular fa-square-plus"></i>
              </button>
            </div>
  
            <q-table class="tabla" flat bordered :rows="rows" :filter="filter" :columns="columns" row-key="index"
              virtual-scroll :rows-per-page-options="[0]">
              <template v-slot:body-cell-NivelFormacion="props">
                <q-td :props="props">
                  {{ JSON.stringify(props.row.NivelFormacion.label) }}
                </q-td>
              </template>
              <template v-slot:body-cell-Estado="props">
                <q-td :props="props">
                  <label for="" v-if="props.row.Estado == 1" style="color: green; font-weight: bold">Activo</label>
                  <label for="" v-else style="color: red; font-weight: bold">Inactivo</label>
                </q-td>
              </template>
  
  
              <template v-slot:body-cell-opciones="props">
                <q-td class="opciones" :props="props">
                  <button class="btnedit" @click="editarficha(props.row._id)">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="btninac" @click="inactivarficha(props.row._id)" v-if="props.row.Estado == 1">
                    <i class="fa-solid fa-xmark" style="color: #ff0000"></i>
                  </button>
                  <button class="btnact" @click="activarficha(props.row._id)" v-else>
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
  
                      <div class="modal_derecho">
                        <div class="rectangulo">Informacion de fichas</div>
                        <div class="container_input2">
                          <div class="container_input3">
                            <label class="label-input" for="">Codigo:</label>
                            <q-input color="green" filled v-model="codigo" class="modal_input2" type="number"
                              lazy-rules :rules="[(val) => !!val || 'Por favor ingrese el codigo de ficha']">
                              <template v-slot:prepend>
                                <i class="fa fa-code" aria-hidden="true"></i>
                              </template>
                            </q-input>
                          </div>
  
  
                          <div class="container_input3">
                            <label class="label-input" for="">Nombre:</label>
                            <q-input color="green" filled v-model="nombre" class="modal_input2" type="text" lazy-rules
                              :rules="[(val) => !!val || 'Por favor ingrese el nombre de la ficha']">
                              <template v-slot:prepend>
                                <i class="fa-solid fa-users-line" aria-hidden="true"></i>
                              </template>
                            </q-input>
                          </div>
  
                        
  
                          <div class="container_input3">
                            <label class="label-input" for="">Fecha de inicio:</label>
                            <q-input color="green" filled v-model="PresupuestoAsignado" class="modal_input2" type="date" lazy-rules
                              :rules="[(val) => !!val || 'Por favor ingrese la fecha de inicio']">
                              <template v-slot:prepend>
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                              </template>
                            </q-input>
                          </div>
                        </div>
  
                        <div class="container_input4">
                          <label class="label-input2" for="">Area:</label>
                          <q-select color="green" filled v-model="Area_Id" :options="options" class="modal_input3"
                            type="text" lazy-rules :rules="[
                              (val) => !!val || 'Por favor ingrese el area de ficha',
                            ]" hide-bottom-space>
                            <template v-slot:prepend>
                              <i class="fa fa-list" aria-hidden="true"></i>
                            </template>
                          </q-select>
                        </div> 
  
                        <div class="container_input2">
  
                          <div class="container_input3">
                            <label class="label-input3" for="">Fecha de finalizacion:</label>
                            <q-input color="green" filled v-model="PresupuestoFin" class="modal_input2" type="date" lazy-rules
                              :rules="[(val) => !!val || 'Por favor ingrese la fecha de finalizacion.']">
                              <template v-slot:prepend>
                                <i class="fa fa-calendar" aria-hidden="true"></i>
                              </template>
                            </q-input>
                          </div>
  
                          <div class="container_input3">
                            <label class="label-input3" for="">Imagen:</label>
                            <input type="file" ref="fileInput" style="display:none" @change="handleFileChange">
                            <q-btn @click="openFileExplorer" icon="image" class="modal_input2">Agregar Imagen</q-btn>
                          </div>
  
                        </div>
  
                        <div class="contenedor_botones">
                          <q-btn flat v-close-popup class="btnagregar1" type="reset" label="Cancelar" />
                          <q-btn label="Agregar" class="btnagregar2" @click="agregarficha()" v-if="btnagregar"
                            type="submit" />
                          <q-btn label="Aceptar" class="btnagregar2" @click="agregarficha()" v-if="btnaceptar"
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
  import { format } from "date-fns";
  import { usecontratostore } from "../stores/Contrato.js";

  const contratostore = usecontratostore();
  
  const options = ref([]);
  const $q = useQuasar();
  const fileInput = ref(null);
  const imageUrl = ref("");
  
  let notification;
  let codigo = ref("");
  let nombre = ref("");
  let PresupuestoAsignado = ref("");
  let PresupuestoFin = ref("");
  const filter = ref("");
  let text = ref("Agregar Ficha");
  let btnaceptar = ref(false);
  let btnagregar = ref(true);
  let prompt = ref(false);
  const cargando = ref(false);
  
  function agregar() {
    prompt.value = true;
    xd.value = 0;
    limpiar();
    eliminarImagen();
    text.value = "Agregar Ficha";
    btnaceptar.value = false;
    btnagregar.value = true;
  }

  
  
  let rows = ref([]);
  let ficha = ref([]);
  let xd = ref(0);
  /* let Area_Id = ref(""); */
  const columns = [
    {
      name: "Codigocontrato",
      label: "Codigo",
      field: "CodigoFicha",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        fontSize: "15px",
      },
      align: "center",
    },
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
      name: "PresupuestoAsignado",
      label: "Presupuesto Asignado",
      field: val => eliminarComillas(val.NivelFormacion.label),
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
    codigo.value = "";
    nombre.value = "";
   
    PresupuestoFin.value = "";
    PresupuestoAsignado.value = "";
    Area_Id.value = "";
  }
  function eliminarComillas(cadena) {
    if (cadena.startsWith('"') && cadena.endsWith('"')) {
      return cadena.slice(1, -1);
    } else {
      console.log('a');
      return cadena;
    }
  }
  
  async function agregarficha() {
    if (xd.value == 0) {
      try {
        showDefault();
        await fichastore.postinfoficha({
          CodigoFicha: codigo.value,
          Nombre: nombre.value,
  
          PresupuestoAsignado: PresupuestoAsignado.value,
          PresupuestoFin: PresupuestoFin.value,
          Area_Id: Area_Id._rawValue.value,
        });
        obtenerInfo();
        if (notification) {
          notification();
        }
        limpiar();
        $q.notify({
          spinner: false,
          message: "Ficha Agregada",
          timeout: 2000,
          type: "positive",
        });
        obtenerInfo();
        prompt.value = false
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
      let id = idficha.value;
      if (id) {
        try {
          showDefault();
          await fichastore.puteditarficha(id, {
            CodigoFicha: codigo.value,
            Nombre: nombre.value,
       
            PresupuestoAsignado: PresupuestoAsignado.value,
            PresupuestoFin: PresupuestoFin.value,
            Area_Id: Area_Id._rawValue.value,
          });
          btnagregar.value = true;
          btnaceptar.value = false;
          text.value = "Agregar ficha";
          if (notification) {
            notification();
          }
          limpiar();
          $q.notify({
            spinner: false,
            message: "Ficha Actualizada",
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
  
  let idficha = ref("");
  async function editarficha(id) {
    prompt.value = true;
    obtenerarea();
    xd.value = 1;
    const fichaseleccionada = ficha.value.find(
      (transporte) => transporte._id === id
    );
    if (fichaseleccionada) {
      idficha.value = String(fichaseleccionada._id);
      btnagregar.value = false;
      btnaceptar.value = true;
      text.value = "Editar Ficha";
      codigo.value = fichaseleccionada.CodigoFicha;
      nombre.value = fichaseleccionada.Nombre;

      Area_Id.value = {
        label: `${fichaseleccionada.Area_Id.Nombre}`,
        value: String(fichaseleccionada.Area_Id._id),
      };
      PresupuestoFin.value = format(new Date(fichaseleccionada.PresupuestoFin), "yyyy-MM-dd");
      PresupuestoAsignado.value = format(
        new Date(fichaseleccionada.PresupuestoAsignado),
        "yyyy-MM-dd"
      );
    }
  }
  async function obtenerInfo() {
    try {
      cargando.value = true;
      const response = await fichastore.obtenerinfoficha();
      console.log(response);
      ficha.value = fichastore.fichas;
      rows.value = fichastore.fichas;
      obtenerarea();
    } catch (error) {
      console.log(error);
    } finally {
      cargando.value = false;
    }
  }
  
  async function obtenerarea() {
    try {
      await areastore.obtenerinfoarea();
      options.value = areastore.area.map((area) => ({
        label: `${area.Nombre} `,
        value: String(area._id),
      }));
    } catch (error) {
      console.log(error);
    }
  }
  onMounted(async () => {
    obtenerInfo();
  });
  
  // Inactivar ficha
  async function inactivarficha(id) {
    try {
      showDefault();
      await fichastore.putinactivarficha(id);
      cancelShow();
      greatMessage.value = "Ficha Inactiva";
      showGreat();
      obtenerInfo();
    } catch (error) {
      cancelShow();
      badMessage.value = error.response.data.error.errors[0].msg;
      showBad();
    }
  }
  
  // Activar ficha
  async function activarficha(id) {
    try {
      showDefault();
      await fichastore.putactivarficha(id);
      cancelShow();
      greatMessage.value = "Ficha Activa";
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
    margin: 0px 60px 0px 0px;
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
  i{
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
  