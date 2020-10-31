import axios from "axios"

export const state ={
    cabecera_compras: {
        NroFactura: "",
        Fecha: new Date().toISOString().substr(0, 10),
        estado: "",
        codigocondicion: "",
        codigoUsuario: "",
        codigoPedido: "",
        codigoFormasPagos: "",
        codigoProveedor: "",
    }
};

export const mutations= {
    SET_CABECERA_COMPRA(state, cabecera_compras){
        state.cabecera_compras = cabecera_compras;
    } 
};

export const actions= {
    insertCompras({commit}, configuracion){
        console.log(state.cabecera_compras, configuracion);
    }
}