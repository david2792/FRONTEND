import axios from 'axios';

export const state= {
    cabecera: [],
    orden_done: [],
    fechaDesde:new Date().toISOString().substr(0, 10),
    fechaHasta: new Date().toISOString().substr(0, 10),
    numerochapa:"",
    estadoorden: "1",
    detalleOrdenTrabajo:[],
};
export const mutations= {
    SET_CABECERA(state, cabecera){
        state.cabecera = cabecera;
    },

    SET_DONE(state, orden_done){
        state.orden_done = orden_done;
    },
     SET_DETALLE_ORDEN_TRABAJO(state, detalle_orden){
         state.detalleOrdenTrabajo = detalle_orden
     }
};
export const actions= {
    setData({commit}, configuracion){
        axios
            .post('orden/lista_entregados', {fechadesde:state.fechaDesde , fechaHasta:state.fechaHasta, numerochapa:state.numerochapa}, configuracion)
            .then((result) => {
                console.log(result);
                commit('SET_CABECERA', result.data);
            }).catch((err) => {
                console.log(err)
            });
    },

    getCabecera({commit}, configuracion){
        axios
            .get('orden/listadones', configuracion)
            .then((result) => {
                console.log(result);
                commit('SET_DONE', result.data);
            }).catch((err) => {
                console.log(err)
            });
    },

    getDetalleOrdenTrabajo({commit}, configuracion){
        console.log("middleware, here: ", state.numerochapa, state.estadoorden, state.fechaDesde, state.fechaHasta, configuracion);
        axios
            .post('orden/listaDetallesOrdenTrabajo',{numerochapa:state.numerochapa, estadoorden:state.estadoorden, fechadesde:state.fechaDesde, fechaHasta:state.fechaHasta}, configuracion)
            .then((result) => {
                console.log(result.data);
                commit('SET_DETALLE_ORDEN_TRABAJO', result.data)
            }).catch((err) => {
                console(err);
            });
    }
};