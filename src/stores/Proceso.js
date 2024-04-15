import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
//Falta
export const useprocesostores = defineStore('proceso', () => {
    const Proceso = ref([]);

    const obtenerinfoproceso = async () => {
        try {
            let resopnsered = await axios.get('proceso/procesobusca');
            console.log("soy get proceso", resopnsered);
            Proceso.value = resopnsered.data;
        } catch (error) {
            throw error
        }
    };

    const postinfoproceso = async (data) =>{
        try {
            let res = await axios.post('proceso/procesocrear', data);
            console.log(res);
            console.log(data);
            return res
        } catch (error) {
            throw error
        }
    };

    const puteditarproceso = async (id, data) =>{
        try {
            let res = await axios.put(`proceso/procesomodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };
    
    const puteditarpresupuesto = async (id, data) =>{
        try {
            let res = await axios.put(`proceso/ajustarpresupuesto/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putinactivarproceso = async (id)=>{
        try {
            let r = await axios.put(`proceso/inactivar/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }
    const putactivarproceso = async (id)=>{
        try {
            let r = await axios.put(`proceso/activar/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }

    return{
        Proceso,
        obtenerinfoproceso, postinfoproceso, puteditarproceso, puteditarpresupuesto, putinactivarproceso, putactivarproceso
    };









});