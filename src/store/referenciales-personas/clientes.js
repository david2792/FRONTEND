import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    clientes: [],
    Cliente:{
        RazonSocial: "",
        CodigoCliente: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
       
        CodigoCiudad:"",
        Email: "",
        configuracion: [],
    },
    edit:false,
};

export const mutations = {
    SET_CLIENTE(state, cliente){
        console.log(cliente);
        state.clientes = cliente;
    },
    GET_CLIENTE(state, value){
        console.log("Muttations: ", value)
        state.Cliente = value;
    }
};

export const actions = {
    getClientes({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('clientes', configuracion)
            .then(cliente => cliente.data)
            .then(cliente => {
                commit("SET_CLIENTE", cliente);
            });
    },
    insertCliente({ commit }, cliente){
        console.log("recibiendo valores para registrar cliente: ", cliente.configuracion);
        axios
        .post('clientes', {clientes: cliente}, cliente.configuracion)
        .then(function (response) {
            console.log('Hola!!!')
            
        })
        .catch(function(error) {
            console.log(error);
          });
    },
    getCliente({commit}, item){
        console.log("Item recibido", item);
        commit("GET_CLIENTE", item);
    }
};

export const getters = {
    setCliente: (state) => {
        console.log(state.Cliente.CodigoCliente)
        return state.cliente;
    }
};