import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import store from '..';

export const state = {
    facturaciones: [],
    Cabecera:{
        CodigoTiposDocumento:"",
        numeroApertura:"",
        NumeroTimbrado:"",
        CodigoSucursal:"",
        PuntoExpedicion:"",
        NumeroFactura:"",
        CodigoCondicion:"",
        CodigoFormasCobro:"",
        CodigoCliente:"",
        Apodo:"",
        CodigoUsuario:"",
        Fecha:"",
        Hora:"",
        Estado:"",
        TotalLetras:""
        
    },
    
    DetalleCabecera:{
        codigoproducto:'',
        descripcion:'',
        cantidad:'',
        precio:'',
        subtotal:'',
        stockactual:'',
        total:'',
        datosDetalle:[]
    },
//   datos de apertura
        numeroApertura:"",
        caja:"",
        Cajero:"",
//   fin datos de apertura
// datos empresa 
        PuntoExpedicion:"",
        CodigoSucursal:"",
        NumeroTimbrado:"",
// fin datos empresa
    codigo:"",
    datosApertura:[],
    detalleFactura:[],
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_FACTUTA(state, producto){
      //  console.log(producto);
        state.productos = producto;
    },
    GET_APERTURA(state, value){
        console.log("Muttations: ", value)
        state.Producto = value;
    },
    SET_VALIDARAPERTURA(state,apertura)
    {
       // console.log(apertura)
        state.numeroApertura=apertura[0].numeroApertura
        state.caja=apertura[0].caja
        state.Cajero=apertura[0].Cajero
    },
    SET_VALIDARTIMBRADO(state,timbrado)
    {
      //  console.log("timbrado "+timbrado[0].NumeroTimbrado)
        state.Cabecera.NumeroTimbrado=timbrado[0].NumeroTimbrado
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    getNumeroTimbrado({commit}, configuracion) {
        console.log(state.Cabecera.CodigoTiposDocumento);
        axios
        .get(`facturacion/timbrado/${state.Cabecera.CodigoTiposDocumento}`, configuracion)
            .then(timbrado => timbrado.data)
            .then(timbrado => {
                commit("SET_VALIDARTIMBRADO", timbrado);
            });
      },

    getValidarApertura({commit},configuracion){
        axios
        .get(`facturacion/validar/${state.Cabecera.CodigoUsuario}`, configuracion)
            .then(apertura => apertura.data)
            .then(apertura => {
                commit("SET_VALIDARAPERTURA", apertura);
            });

    },
    
    guardarFactura({ commit }, configuracion) {
        console.log(configuracion);
            console.log("Guardar", state.Cabecera)
            console.log("Guardar", state.DetalleCabecera)
            let setCabecera = state.Cabecera;
            let setDetalle = state.DetalleCabecera;  
            axios
                .post('facturacion/guardar', { cabeceras: setCabecera, detalles:setDetalle }, configuracion)
                .then(result =>{
                  commit("SET_FACTURA",result);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            state.editar_item = !state.editar_item;
    },

    getProducto({commit}, item){
        console.log("Item recibido", item);
        commit("GET_PRODUCTO", item);
    },
    buscarCodigoBarra({commit}){
        let producto = state.productos.find(
            find => find.CodigoBarra === state.Producto.CodigoBarra
          );
          // console.log(value);
          if(producto){
            console.log("encontrado", state.Producto.CodigoBarra);
            state.show_alert = true
            commit('SHOW_ALERT', state.show_alert)
          }else{
              console.log("datos validos")
              state.show_alert = false
              commit('SHOW_ALERT', state.show_alert)
          }
},
}
export const getters = {
    setFacturacion: (state) => {
        console.log(state.Cabecera.NumeroFactura)
        return state.aperturas;
    }
};