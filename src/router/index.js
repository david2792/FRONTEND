import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Login from '../components/acceso/Login.vue';
import bienvenida from '../components/pantallaPrincipal/bienvenida.vue'
import Home from '../views/Home'
import VistaCliente from '../views/cliente/VistaCliente.vue'
Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      libre: true
    }
    },
    {
      path: '/bienvenida',
      name: 'Bienvenida',
      component: bienvenida,
      meta: {
        administrador:true
        }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        administrador:true
        }
    },
    {
      path: '/clientes',
      name: 'cliente',
      component: VistaCliente,
      meta: {
        libre: true
      }
      },
  ]
})
router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.NivelUsuario == 'ADMINISTRADOR'){
    if (to.matched.some(record => record.meta.administrador)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 'Vendedor'){
    if (to.matched.some(record => record.meta.vendedor)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 'Almacenero'){
    if (to.matched.some(record => record.meta.almacenero)){
      next();
    }
  } else{

      next({name: 'Login'});
    localStorage.clear();


  }
})
export default router
