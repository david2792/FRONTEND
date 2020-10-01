import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    recepciones: [],
    Recepcion:{
        codigosucursal:"",
        puntoexpedicion:"",
        numero:"",
        codigo:"",
        chapa:"",
        codigocliente:"",
        recibidopor:"",
        estado:"",
        fechaentrada:"",
        horaentrada:"",
        observaciones:"",

        
    },
    detalleRecepcion:{
        codigosucursal:"",
        puntoexpedicion:"",
        numero:"",
        codigovehiculos:"",
        codigonivelcombustible:"",
        km:"",
    },
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_RECEPCION(state, recepcion){
        console.log(recepcion);
        state.recepciones = recepcion;
    },
    GET_RECEPCION(state, value){
        console.log("Muttations: ", value)
        state.Recepcion = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    getBuscador({commit}, configuracion){
        console.log(configuracion);
        axios
            .get(`rvehiculo/list/${state.Recepcion.CodigoCliente}`, configuracion)
            .then(result =>{
                console.log(result.data)     
                commit("SET_RECEPCION", result.data);
              
            }).catch(error=>{
                console.log("Error: "+error);
            });
    },
    getRecepciones({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('rvehiculo/listar', configuracion)
            .then(recepcion => recepcion.data)
            .then(recepcion => {
                commit("SET_RECEPCION", recepcion);
            });
    },
    
    guardarRecepcion({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("Guardar", state.Recepcion)
            let setRecepcion = state.Recepcion;
            axios
                .post('rvehiculo', { recepciones: setRecepcion }, configuracion)
                .then(result =>{
                    commit("SET_RECEPCION", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
            //state.editar_item = !state.editar_item;
        } else {
            console.log("Editar", state.Recepcion);
            let setRecepcion = state.Recepcion;
            axios
                .put('vehiculos', { recepciones: setRecepcion }, configuracion)
                .then(result =>{
                    commit("SET_RECEPCION", result.data);
                    state.mensaje="Registro Modificado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
                console.log("Editar", state.Recepcion);
                state.editar_item = !state.editar_item;
          //  state.editar_item = !state.editar_item;
        }
    },

    getRecepcion({commit}, item){
        console.log("Item recibido", item);
        commit("GET_RECEPCION", item);
    },

}
export const getters = {
    setRecepcion: (state) => {
        console.log(state.Recepcion.numero)
        return state.recepcion;
    }
};