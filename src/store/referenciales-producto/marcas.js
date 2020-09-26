import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Marcas: [],
};

export const mutations = {
    SET_MARCA(state, Marcas){
        console.log(Marcas);
        state.Marcas = Marcas;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getMarcas({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('marcas', configuracion)
            .then(marca => marca.data)
            .then(marca => {
            //   console.log(ciudad)
               commit("SET_MARCA", marca);
            });
    }
};

export const getters = {
};