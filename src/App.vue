<template>
<v-app>


    <v-main class="mx-4 mb-4">
      <v-container fluid>

          <NavBar></NavBar>
            <router-view></router-view>


      </v-container>
    </v-main>
      
</v-app>
</template>

<script>
import NavBar from './components/NavBar'

import { defineComponent } from 'vue'
import { useUserStore } from './stores/userstore'

export default defineComponent({
//export default {
  name: 'App',
  components: { 
    NavBar,
  },

setup() {
    const userG = useUserStore()

    return{
      userG,
    }
  },


  data: () => ({
    //
  })
});
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
