import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'
import * as vCliente from '../store/referenciales-personas/clientes.js'
import * as ciudad from '../store/referenciales-localidades/ciudad.js'

import *as dialogo from '@/store/dialogo/dialogo.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    vCliente,
    ciudad,
    dialogo
  },
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    guardarToken({commit}, token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name: 'autoLogin'});
    }
  }
})
