import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const usecontratostore = defineStore('contrato', () => {
    const contrato = ref([]);

    const obtenerinfocontrato = async () => {
        try {
            let responsecontrato = await axios.get('contrato/contratobusca');
            console.log(responsecontrato);
            contrato.value = responsecontrato.data.contratos;
        } catch (error) {   
            throw error
        }
    };

    const postinfocontrato = async (data) => {
        try {
            let responsecontrato = await axios.post('contrato/contratocrear', data);
            console.log(responsecontrato);
            contrato.value = responsecontrato.data.contratos;
            console.log(contrato);
            return responsecontrato
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const puteditarcontrato = async (id, data) => {
        try {
            let responsecontrato = await axios.put(`contrato/contratomodificar/${id}`, data);
            return responsecontrato
        } catch (error) {
            throw error;
        }
    };

    const putInactivarcontrato = async (id) => {
        try {
            let responsecontrato = await axios.put(`contrato/contratoinac/${id}`)
            return responsecontrato
        } catch (error) {
            console.log(error, "Error al cambiar el estado del contrato");
        }
    };
    const putActivarcontrato = async (id) => {
        try {
            let responsecontrato = await axios.put(`contrato/contratoact/${id}`)
            return responsecontrato
        } catch (error) {
            console.log(error, "Error al cambiar el estado del contrato");
        }
    };

    return {
        contrato,
        obtenerinfocontrato, postinfocontrato, puteditarcontrato, putInactivarcontrato, putActivarcontrato
    };
});