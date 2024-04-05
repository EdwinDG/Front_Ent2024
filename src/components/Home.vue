<template>
    <body>
        <div class="contenedor_principal">
            <div class="contenedor_titulos">
                <p class="titulo">Manejo de Inventario</p>
                <!--  <p class="titulo2">Version 1.0</p> -->
            </div>
            <div class="contenedor">
                <div class="q-pa-md" id="cuadrar" >
                    <q-list
                        padding
                        bordered
                        class="rounded-borders"
                        default-opened
                        style="
                            background-color: rgba(255, 255, 255, 0.575);
                            border-top: 3px solid rgba(170, 168, 168, 0.575);
                        "
                    >
                        <q-expansion-item
                            dense
                            dense-toggle
                            expand-separator
                            icon="menu"
                            v-model="isExpanded"
                            label="Menu"
                            
                        >
                            <q-card >
                                <q-card-section>
                                    <div class="contenedor_caja1">
                                        <router-link
                                            to="./TablaFichas"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/fichas1.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">Fichas</p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaProductos"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/productos.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">
                                                    Productos
                                                </p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaUsuarios"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/Usuario.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">
                                                    Usuarios
                                                </p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaArea"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/area.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">
                                                    Dependencias
                                                </p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaLotes"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/lotes.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">Lotes</p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaPedidos"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/pedido.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">
                                                    Pedidos
                                                </p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="/Perfil"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/perfil.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">Perfil</p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <router-link
                                            to="./TablaHistorial"
                                            style="
                                                text-decoration: none;
                                                color: black;
                                            "
                                        >
                                            <div class="contenedor_caja2">
                                                <img
                                                    class="caja_imagen"
                                                    src="../img/historial.png"
                                                    alt=""
                                                />
                                                <p class="nombre_img">
                                                    Historial
                                                </p>
                                            </div>
                                        </router-link>
                                        <!-- ---------- -->
                                        <!--   <router-link to="./ItemPresupuesto" style="text-decoration: none; color: black;">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen2" src="../img/programa.png" alt="">
                        <p class="nombre_img">Presupuesto</p>
                      </div>
                    </router-link> -->
                                        <!-- ---------- -->
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>
                </div>
                <!-- <div class="q-pa-md" style="width: 100%;">
          <q-list padding bordered class="rounded-borders" default-opened
            style="background-color: rgba(255, 255, 255, 0.575); border-top: 3px solid rgba(170, 168, 168, 0.575);">
            <q-expansion-item dense dense-toggle expand-separator icon="menu" v-model="isExpanded2" label="Distribucion de presupuesto">
              <q-card>
                <q-card-section>
                  <div class="contenedor_caja1">
                    <router-link to="./ItemPresupuesto" style="text-decoration: none; color: black; ">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/fichas1.png" alt="">
                        <p class="nombre_img">Item Presupuesto</p>
                      </div>
                    </router-link>
                    
                     <router-link to="./DistribucionPresupuesto" style="text-decoration: none; color: black; ">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/fichas1.png" alt="">
                        <p class="nombre_img">Distribucion  Presupuesto</p>
                      </div>
                    </router-link> 
                    <router-link to="./TablaFichas" style="text-decoration: none; color: black; ">
                      <div class="contenedor_caja2">
                        <img class="caja_imagen" src="../img/fichas1.png" alt="">
                        <p class="nombre_img">Fichas</p>
                      </div>
                    </router-link> 
                     </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>  -->
                <!-- <div class="contenedor2">
          <div class="contenedor3">
            <div class="q-pa-md" style="width: 100%;">
              <q-list padding bordered class="rounded-borders"
                style="background-color: rgba(255, 255, 255, 0.575); border-top: 3px solid rgba(129, 175, 129, 0.575); padding: 0; ">
                <q-expansion-item dense dense-toggle expand-separator icon="menu" label="Espacio disponible">
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                      eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>

             <div class="q-pa-md" style="width: 100%;">
              <q-list padding bordered class="rounded-borders"
                style="background-color: rgba(255, 255, 255, 0.575); border-top: 3px solid rgba(120, 118, 148, 0.575); padding: 0;">
                <q-expansion-item dense dense-toggle expand-separator icon="menu" label="Espacio disponible">
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                      eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div> 
          </div>
        </div>  -->
            </div>
        </div>
    </body>
</template>

<script setup>
import { ref } from "vue";

const isExpanded = ref(true);
const isExpanded2 = ref(true);
</script>

<style scoped>
* {
    font-family: "save";
}

body {
    margin: 0;
    background-color: #ecf0f5;
}

.contenedor_principal {
    background-color: #ecf0f5;
    height: 100%;
}

.contenedor_titulos {
    display: flex;
    justify-content: center;
}

.titulo {
    margin: 0;
    font-size: 45px;
    margin-left: 12px;
}

.titulo2 {
    position: relative;
    top: 13px;
    color: #747272af;
    margin-left: 12px;
    font-size: 13px;
}

.contenedor {
    height: 87vh;
    display: flex;
    align-items: center;
}

.contenedor_caja1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 35px;
}

.contenedor_caja2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 290px;
    height: 200px;
    background-color: #efeff0;
    text-align: center;
    cursor: pointer;
    gap: 10px;
    border-radius: 8px;
}

.contenedor_caja2:hover {

    transform: scale(1.1);
    transition: all 700ms;
    background-color: #dadada;
    
}

.caja_imagen {
  padding: 10px;
    height: 150px;
    width: 150px;
    background-size: contain;
}

.caja_imagen2 {
    position: relative;
    left: 15px;
    margin-top: 5px;
    height: 50px;
    width: 50px;
    background-size: contain;
}

.nombre_img {
   margin: 0;
    font-weight: 600;
}

.contenedor2 {
    margin: 0;
}

.contenedor3 {
    display: flex;
}

.q-pa-md {
    padding: 12px 12px;
}

.card {
    width: 200px;
    height: 250px;
    margin: 0 auto;
    background-color: #f4f4f3;
    border-radius: 8px;
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.card:hover {
    transform: scale(0.9);
    transition: ease 0.6s;
}

.card::after {
    position: absolute;
    content: "";
    background-color: #2e7d32 !important;
    width: 50px;
    height: 100px;
    z-index: -1;
    border-radius: 8px;
}

.tools {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px 0px 10px;
    background: #2e7d32 !important;
    margin-top: -2px;
}

.tools2 {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px 0px 10px 0px;
    background: #2e7d32 !important;
    margin-top: -2px;
}

.circle {
    padding: 0 4px;
}

.card__content {
    margin: 0px;
    border-radius: 8px;
    background: #f4f4f3;
    padding: 10px;
}

.title {
    font-size: 25px;
    text-align: center;
    margin: 0;
}

.content {
    font-size: 14px;
}

.imagenes_icon {
    width: 100%;
}

.box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
}
#cuadrar {
    height: 80%;
    width: 100%;
    
}
.red {
    background-color: #ffffff;
}

.yellow {
    background-color: #ffffff;
}

.green {
    background-color: #ffffff;
}

@media only screen and (max-width: 750px) {
    .contenedor3 {
        display: grid;
    }
}
</style>
