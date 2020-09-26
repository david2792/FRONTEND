import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'
import * as vCliente from '../store/referenciales-personas/clientes.js'
import * as ciudad from '../store/referenciales-localidades/ciudad.js'
// PRODUCTOS
import * as vDeposito from '../store/referenciales-producto/depositos.js'
import * as vProducto from '../store/producto/productos.js'
import * as vMarca from '../store/referenciales-producto/marcas.js'
import * as dialogo from '@/store/dialogo/dialogo.js'
import * as vImpuesto from '../store/referenciales-producto/impuestos.js'
import * as vCategoria from './referenciales-producto/categorias.js'
import * as vServicio from './servicio/servicios.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    vCliente,
    ciudad,
    // productos
    vImpuesto,
    vCategoria,
    vMarca,
    vDeposito,
    vProducto,
    vServicio,
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
