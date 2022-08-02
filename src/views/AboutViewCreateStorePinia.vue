<template>
  <div class="about">
    <h1 class="subheading grey--text">How to create a counter, save a global username and the last experience</h1>
    <v-container fluid class="my-5">



        <v-card>
          <v-card-title class="text-h5 orange lighten-2">
              Edit and Update a Moment within an Experience
          </v-card-title>
            <p> {{userG.counter}} </p>
          <v-card-text>
          </v-card-text>
          <v-card-text>
                <div class="buttons">
                  <v-btn @click=userG.increment_counter>
                    increment
                  </v-btn>

                  <v-btn @click="get_user()">
                    GetUser
                  </v-btn>
                  <v-btn @click="userG.setCurrentUser('zavala55.testnet')">
                    SetUser
                  </v-btn>
                  <v-btn @click=userG.getCurrentExperience>
                    GetExperience
                  </v-btn>
                  <v-btn @click=userG.setCurrentExperience(0)>
                    SetExperience
                  </v-btn>

                </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click=userG.set_counter
            >
              Set User
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="counter_inc"
            >
              Counter Increment
            </v-btn>
          </v-card-actions>
        </v-card>


    </v-container>
  </div>
</template>

<script>

//import { defineComponent, ref } from 'vue'
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userstore'


export default defineComponent({
  name: "AboutView",

  setup() {
    const userG = useUserStore()

//    const itemName = ref('')

/*
    function inc(){
      userG.increment_counter()
    }
*/

    return{
//      inc,
      userG,
      


    }
  },


  created(){
  },

  destroyed() {
  },


  data() {
    return {
      counter0: 0,
      username0: "primero",
    }
  },

  methods: {
     counter_inc(){
      alert ("counter inc");
      this.userG.increment_counter();
//     inc();
//      userG.inc();
    },

    set_user(){
      alert ("set user");
    },

    get_user(){
      const xx = this.userG.getCurrentUser();
      alert ( xx);

    }


  },
})

</script>