
<template>
    <v-layout align-start justify-center wrap >
      <v-flex  xs12 sm12 md12 lg12 xl12 fluid>
        <v-alert
      color="grey darken-3 "
      dark
      dense
      icon="mdi-home"
      prominent
    >
     <h4 class="display-1 font-weight-bold mb-3" align="center">BIENVENIDO AL SISTEMA</h4>

        <h2 align="center"><span>{{listar}}</span></h2>
    </v-alert>
    </v-flex>
      <v-flex  xs12 sm12 md12 lg2 xl2>
       <v-card
            color="indigo accent-4"
            dark
            class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">group</v-icon></center>
             <v-btn color="#BF36" tile  block :to="{name:'cliente'}" >
            <v-icon size="30" left></v-icon>Cliente
            </v-btn>
       
      </v-card>
      </v-flex>
     <!--  -->
     <v-flex  xs12 sm12 md12 lg2 xl2>
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">departure_board</v-icon></center>
             <v-btn color="#BF36" tile  block :to="{name: 'ordenformulario'}" >
            <v-icon size="" left></v-icon>Orden Trabajo
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2>
       <v-card
            color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">local_shipping</v-icon></center>
             <v-btn color="#BF36" tile  block :to="{name: 'recepcion'}" >
            <v-icon size="30" left></v-icon>Recep.Vehiculo
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xll2>
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">plumbing</v-icon></center>
             <v-btn color="#BF36" tile  block   :to="{name: 'producto'}" >
            <v-icon size="30" left></v-icon>Repuestos
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2>
       <v-card
            color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">transfer_within_a_station</v-icon></center>
             <v-btn color="#BF36" tile  block   :to="{name: 'servicio'}" >
            <v-icon size="30" left></v-icon>Servicios
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
        <v-flex  xs12 sm12 md12 lg2 xl2>
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">local_taxi</v-icon></center>
             <v-btn color="#BF36" tile  block  :to="{name: 'vehiculo'}">
            <v-icon size="30" left></v-icon>Vehiculos
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
        <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2  class="pt-2">
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1"
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">add_business</v-icon></center>
             <v-btn color="#BF36" tile  block  :to="{name: 'aperturacaja'}">
            <v-icon size="30" left></v-icon>Apertura
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2 class="pt-2">
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1 "
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">add_shopping_cart</v-icon></center>
             <v-btn color="#BF36" tile  block  :to="{name: 'facturacion'}">
            <v-icon size="30" left></v-icon>Facturacion
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2  class="pt-2">
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1 "
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">attach_money</v-icon></center>
             <v-btn color="#BF36" tile  block  :to="{name: 'arqueo'}">
            <v-icon size="30" left></v-icon>Arqueo
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
       <!--  -->
       <v-flex  xs12 sm12 md12 lg2 xl2  class="pt-2">
       <v-card
           color="indigo accent-4"
            dark
           class="mr-1 "
          >
               <!-- <v-img   class="white--text align-end" :src="require('../../assets/user.png')" ></v-img> -->
            <center><v-icon size="80">content_paste</v-icon></center>
             <v-btn color="#BF36" tile  block  :to="{name: 'Filtro_orden'}">
            <v-icon size="30" left></v-icon>Informe Orden
            </v-btn>
       
      </v-card>
      </v-flex>
      <!--  -->
    </v-layout>

</template>
<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuetifyjs.com"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ],
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4"
    ],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"]
  }),

  computed: {
      listar() {
          let rol =this.$store.state.usuario.Nombre;
         return rol
         // console.log(idproducto)
        },
  },
    methods: {
        // listar() {
        //   let rol =this.$route.params.rol;
        //  return rol
        //  // console.log(idproducto)
        // },
}
}
</script>

<style>
</style>
