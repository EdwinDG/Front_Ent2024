import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useredconexionstores = defineStore('conexionredlote', () => {
    const conexionredlote = ref([]);

    const obteneriforedconexion = async () => {
        try {
            let resopnsered = await axios.get('conexionredlote/conexionredlotebusca');
            console.log("soy get de conexion redLote", resopnsered);
            conexionredlote.value = resopnsered.data;
        } catch (error) {
            throw error
        }
    };
    const obteneriforedconexionbusacrlote = async () => {
        try {
            let resopnsered = await axios.get('conexionredlote/conexionredlotebuscalote');
            console.log("soy get de conexion redLote", resopnsered);
            conexionredlote.value = resopnsered.data;
        } catch (error) {
            throw error
        }
    };

    const postinfored = async (data) =>{
        try {
            let res = await axios.post('redconocimiento/redconocimentocrear', data);
            console.log(res);
            console.log(data);
            return res
        } catch (error) {
            throw error
        }
    };

    const puteditared = async (id, data) =>{
        try {
            let res = await axios.put(`redconocimiento/redconocimientomodificar/${id}`, data);
            return res
        } catch (error) {
            throw error;
        }
    };

    const putinactivarred = async (id)=>{
        try {
            let r = await axios.put(`redconocimiento/inactivar/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }
    const putactivarred = async (id)=>{
        try {
            let r = await axios.put(`redconocimiento/activar/${id}`)
            return r
        } catch (error) {
            console.log(error, "Error al cambiar el estado el ficha");
        }
    }

    return{
        Red_conocimiento,
        obteneriforedconexion, obteneriforedconexionbusacrlote, postinfored, puteditared, putinactivarred, putactivarred
    };









});