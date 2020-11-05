import axios from "axios"

export const state ={
    cabecera_compras: {
        NroFactura: "",
        Fecha: new Date().toISOString().substr(0, 10),
        estado: "",
        codigocondicion:"",
        codigoUsuario: "",
        codigoPedido: "",
        codigoFormasPagos: "",
        codigoProveedor: "",
        total: 0,
    },

    listaCompras: []
};

export const mutations= {
    SET_CABECERA_COMPRA(state, cabecera_compras){
        state.cabecera_compras = cabecera_compras;
    },
    
    SET_LISTA_COMPRAS(state, {NumeroFactura, CodigoProducto, Descripcion, Cantidad, Precio, subTotal}){
        let productInCompras = state.listaCompras.find(item =>{
            return item.CodigoProducto === CodigoProducto;
        });
        if (productInCompras) {
            productInCompras.Cantidad += Cantidad;
            return;
        } 
        state.listaCompras.push({
            NumeroFactura, 
            CodigoProducto, 
            Descripcion, 
            Cantidad, 
            Precio,
            subTotal
        });
    }
};

export const actions= {
    insertCompras({commit}, configuracion){
        console.log(state.cabecera_compras, configuracion);
    },

    addItemToCompras({commit}, {NumeroFactura, CodigoProducto, Descripcion, Cantidad, Precio, subTotal}){
        commit('SET_LISTA_COMPRAS', {NumeroFactura, CodigoProducto, Descripcion, Cantidad, Precio, subTotal});
        console.log("Lista de compras: ", state.listaCompras);
    }
};

export const getters={
    totalCompras: state =>{
        let total = 0;
        total = state.listaCompras.forEach(element => {
            total += parseInt(element.Precio, 10) * parseInt(element.Cantidad, 10);
        });

        return total;
    }
};