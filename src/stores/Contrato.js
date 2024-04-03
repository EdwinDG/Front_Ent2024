import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';


export const useproductostore = defineStore('producto', () => {
    const producto = ref([]);

    const obtenerinfoproducto = async () => {
        try {
            let responseproducto = await axios.get('producto/productobusca');
            console.log(responseproducto);
            producto.value = responseproducto.data.productos;
        } catch (error) {   
            throw error
        }
    };

    const postinfoproducto = async (data) => {
        try {
            let responseproducto = await axios.post('producto/productocrear', data);
            console.log(responseproducto);
            producto.value = responseproducto.data.productos;
            console.log(producto);
            return responseproducto
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    const puteditarproducto = async (id, data) => {
        try {
            let responseproducto = await axios.put(`producto/productomodificar/${id}`, data);
            return responseproducto
        } catch (error) {
            throw error;
        }
    };

    const putInactivarproducto = async (id) => {
        try {
            let responseproducto = await axios.put(`producto/productoinac/${id}`)
            return responseproducto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del producto");
        }
    };
    const putActivarproducto = async (id) => {
        try {
            let responseproducto = await axios.put(`producto/productoact/${id}`)
            return responseproducto
        } catch (error) {
            console.log(error, "Error al cambiar el estado del producto");
        }
    };

    return {
        producto,
        obtenerinfoproducto, postinfoproducto, puteditarproducto, putInactivarproducto, putActivarproducto
    };
});