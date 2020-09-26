import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Categorias: [],
};

export const mutations = {
    SET_CATEGORIA(state, Categorias){
        console.log(Categorias);
        state.Categorias = Categorias;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getCategorias({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('categorias', configuracion)
            .then(categoria => categoria.data)
            .then(categoria => {
            //   console.log(ciudad)
               commit("SET_CATEGORIA", categoria);
            });
    }
};

export const getters = {
};