<template>
<v-main fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Points of View</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Participate in SharingShard with your ideas</p>
      </v-flex>
    </v-layout>

      <v-row>
        Discover the value in this learning experience: {{title}}
      </v-row>

      <v-row  style="height: 500px;">
        <v-col class="pa-8">
                      
          <iframe
              width="100%"
              height="100%"
              :src=url_experiencia
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
          ></iframe>
        </v-col>

        <v-col class="pa-4">
        <v-container id="input-usage" >
          <v-row>
            Time: 
            <v-text-field v-model="ss_pov_moment_time">
            Label="Introduce the timemark where you define the moment in the video"
            </v-text-field>
          </v-row>
        </v-container>
          <v-row>
            <v-col
                cols="40"
                md="12"
              >
              <v-textarea
                filled
                v-model="ss_pov_moment"                         

                name="input-7-4"
                label="Create a Point of View about this challenge"
                value=moment
                auto-grow
                rows="15"
                row-height="15"
              ></v-textarea>

            </v-col>
          </v-row>
        </v-col>
      </v-row>
    
      <v-row>
        <v-col class="pa-6">
          <p>URL del video:</p><span>{{url_experiencia}}</span> ---- {{ss_pov_moment}} ---- is here

        </v-col>

        <v-col class="pa-6">  
          <v-row>
            <v-col>
              <v-btn class="pa-2"
                depressed
                color="primary"
                @click=clickea_insert_moment()
              >
                Insert
              </v-btn>
            </v-col> 

            <v-col> 
              <v-btn class="pa-2"
                depressed
                color="primary"
                @click=clickea_edit_moment()

              >
                Edit
              </v-btn>
            </v-col>

            <v-col> 
              <v-btn class="pa-2"
                depressed
                color="primary"
                @click=clickea_delete_moment()
              >
                Delete
              </v-btn>
            </v-col> 
          </v-row>
        </v-col>
      </v-row>

    <div>
      <h2>List Points of View</h2>
      <div>
        <v-data-table
          :headers="headers"
          :items="PoV"
          item-key="name"
          :items-per-page="15"
          class="elevation-1"
        ></v-data-table>
      </div>
    </div>
</v-main>
</template>
    
<script>
import * as nearAPI from 'near-api-js'
const { connect, WalletConnection, keyStores, Contract } = nearAPI;

const CONTRACT_ID = "dev-1656452729299-85030592138402";
const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
};


  export default {
    name: "PoView",

  created(){
    // this.disp_pov();
    /*
    console.log("POV created: " + window.location.href);
    console.log(this.$route.params);
    const cual = this.$route.params.video_id;
    console.log( cual );
    console.log(this.$route.params.video_id);
    */
    this.disp_experiences_for_pov(this.$route.params.video_id);

  },  


    data() {

    return {
        exp_info: "",


        poview: "",
        title: "Video de pruebas",
        url_experiencia: "https://youtube.com/embed/WCUGI8PGcGw",
        time: 10,
        moment: "cadena de caracteres",

        btn_insert: "Insert",
        btn_edit: "Edit",
        btn_delete: "Delete",
        textarea: null,
        ss_pov_moment: "",
        ss_pov_moment_time: 33,

        headers: [
          {
            text: 'Points of View',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Owner 1', value: 'owner'},
          { text: 'Video', value: 'PoV'},
        ],


        PoV:[
          {
            name: 'Video 1',
            owner: 'ss2022_jc.testnet',  //wallet
            video_id: 2,
            PoV: "PoV 1 en el video 2 de Jorge",
          },
          {
            name: 'Video 2',
            owner: 'zavala55.testnet',
            video_id: 3,
            PoV: "PoV 2 en el video 2 de Jorge",
          }
        ]
      }
    },
    methods: {
      clickea_insert_moment(){
        console.log( "clickea_insert_moment -- Captura: " + this.ss_pov_moment + "----" + this.ss_pov_moment_time );
      },
      clickea_edit_moment(){
        console.log( "clickea_edit_moment -- Captura: " + this.ss_pov_moment + "----" + this.ss_pov_moment_time );
      },
      clickea_delete_moment(){
        console.log( "clickea_delete_moment -- Captura: " + this.ss_pov_moment + "----" + this.ss_pov_moment_time );
      },

      clickea(){
        console.log( "Captura: " + this.ss_pov_moment + "----" + this.ss_pov_moment_time );
      },



      async disp_experiences_for_pov( video_id ){
        const near = await connect(config);
        const wallet = new WalletConnection(near, 'ss');

        const contract = new Contract(wallet.account(), CONTRACT_ID, {
          viewMethods:  ['getNumber_of_experiences', 'getUser_exp','getExperience'],
          sender: wallet.account()
        });
        console.log( "disp_experiences_for_pov" );

          this.exp_info = await contract.getExperience({
            video_n: video_id
          });

          console.log( "disp_experiences_for_pov -- parte 2" );

          console.log( this.exp_info ); 

          console.log( this.exp_info.pov )
          console.log( this.exp_info.pov.length )
          console.log( this.exp_info.pov[0] )
          console.log( this.exp_info.pov[0].length )
          console.log( this.exp_info.pov[0][0] )
          console.log( this.exp_info.pov[0][1] )

          this.ss_pov_moment = this.exp_info.pov[0][1]



          
        
      },
/*      filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },


        To use in reading the information for the experience

          "url" : this.experienciesview[video_id - 1].url,
          "title" : this.experienciesview[video_id - 1].title,
          "description" : this.experienciesview[video_id - 1].description,
          "id" : this.experienciesview[video_id - 1].id,
          "owner" : this.experienciesview[video_id - 1].owner,
          "reward" : this.experienciesview[video_id - 1].reward,

          "time" : this.experienciesview[video_id - 1].time,
          "moment" : this.experienciesview[video_id - 1].moment,


*/
  }

}
</script>
