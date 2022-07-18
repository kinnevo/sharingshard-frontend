<template>
<div class="c_experienciesview">
    <h1 class="subheading grey--text">Experiences</h1>
    <p>Choose the experiences where you want to collaborate</p>
    <v-container fluid v-if= display_experiencies class="my-5">
      <v-toolbar-title class="text-right">
      <p> ------  {{ statusT }}   ----- </p>
      <p> {{ users_value }} <p/>
      <p>Experience List: {{ exp_list }} -- {{experienciesview.length}} </p>
      <p> near_env: {{ near_env }} </p>

        <v-container fluid>
          <v-row>
          <v-col md-2>
            <v-select label="Users" :items=users @input="select_user"></v-select>

          </v-col>
          <v-col md-8>
            <p> </p>
          </v-col>
          <v-col md-2>
            <!--------------------- New Experience Dialog ------------------------->

            <v-dialog
              v-model="new_experience"
              max-width="1000px"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 text-right"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Experience
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  New Experience
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                        <v-text-field
                          v-model="newExp.title"
                          label="Titulo"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-textarea
                          rows="5"
                          row-height="5"
                          v-model="newExp.description"
                          label="Description"
                        ></v-textarea>
                      </v-row>
                    <v-row>
                        <v-text-field
                          v-model="newExp.url"
                          label="URL"
                        ></v-text-field>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field class="text-right"
                          v-model="newExp.rewards"
                          label="Rewards"
                        ></v-text-field>
                      </v-col>

                      <v-divider
                        class="mx-4"
                        inset
                        vertical
                      ></v-divider>

                      <v-col>
                        <v-text-field class="text-right"
                          v-model="newExp.time"
                          label="Time to watch the moment in the video"
                        ></v-text-field>
                      </v-col>
                    </v-row>


                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeExp"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveExp"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          </v-row>
        </v-container>
      </v-toolbar-title>


      <v-row>
        <v-col xs12 sm6 md4 lg3 v-for="item in experienciesview.length" :key="item">
          <v-card text class="text-xs-center ma-3">
            <v-responsive class="pt-3">
              <iframe
                  width="100%"
                  height="100%"
                  :src=experienciesview[item-1].url
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
              ></iframe>
            </v-responsive>

          <v-card-text>
            <div v-if=!hide_it class="subheading text-sm-left">Video: {{ experienciesview[item-1].video_n }}</div>
            <div class="subheading text-sm-left">{{ experienciesview[item-1].title }}</div>

            <div class="subheading text-sm-left">{{ experienciesview[item-1].description }}</div>
            <div class="grey--text"><p class="text-sm-left">Reward: {{ experienciesview[item-1].reward }}</p></div>
            <div class="subheading text-sm-left">By: {{ experienciesview[item-1].owner }}</div>

            <v-divider></v-divider>

            <div class="grey--text">{{ experienciesview[item-1].url }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="grey" @click="goToMoment( item )">
              <v-icon small left>mdi-message</v-icon>
              <span class="">Moment</span>
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn text color="grey" @click="goToPoV( experienciesview[item-1].video_n )">
              <v-icon small left>mdi-message</v-icon>
              <span class="">PoV</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
  <v-container  v-if= !display_experiencies class="my-5">
    <p>Get ready to participate providing your points of views or asking for help developing your own experiences</p>
    <p>Login with your Near Wallet</p>

  </v-container>


</div>
</template>

<script>
import * as nearAPI from 'near-api-js'

const { connect, WalletConnection, keyStores, Contract } = nearAPI;

const CONTRACT_ID = "dev-1657705831666-13982695489359";
const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
};

export default {
  name: "ExperiencesView",
  /* https://learnvue.co/tutorials/vue-lifecycle-hooks-guide
    created()
    mounted()
    updated()
  */
  created(){
    this.disp_experiences( "-1" ); // display de experiences of the current user
  },  

/*
struct Experience{
    title: String,
    owner: AccountId,
    description: String,
    url: String,
    topic: u8,
    reward: Balance,
    exp_date: i64,
    moment: String,
    time: u16,
    pov: UnorderedMap<AccountId, String>,
    status: String,
}

"wallet": "zavala55.testnet",

"experience_name": "Aprendizajes en el Silicon Valley", 
"description": "Narración de la Experiencia de Virgilio Raiden en su visita a SV", 
"url": "https://youtube.com/embed/WCUGI8PGcGw",
"reward": 10, 
"expire_date":20, 
"topic":8
*/

  data() {
    return {
      video_info: 0,
      exp_list: [""],
      exp_info: "",
      experienciesview: [""],
      display_experiencies: false,

      new_experience: false,
      newExp: {
        title: "",
        description: "",
        owner: "",
        url: "",
        rewards: 0,
        moment: "",
        time: 0,
        expire_date: 0,
        topic: 0,

      },
      statusT: "inicial",
      hide_it: true,

      users: [ 'my experiences', 'zavala55', 'ss2022', 'ss2022_jc', 'ten.jciglesias' ],
      users_value: "",

      near_env: `${process.env.VUE_APP_NEAR_ENV}`,

    }
  },
  methods: {

    select_user(item) {
      this.users_value = item;
      this.disp_experiences(this.users_value);
    },


    /*
    * Display de experiences of the owner 
    * -1 -- means current signed user
    */
    async disp_experiences( exp_owner ){
      const near = await connect(config);
      const wallet = new WalletConnection(near, 'SharingShard');

      if (wallet.isSignedIn()) {
        console.log("ExperienceView -- Signed");

        if ( exp_owner == -1 )
          this.newExp.owner = wallet.getAccountId();
        else
          this.newExp.owner = exp_owner + "." + this.near_env;


        console.log( "These are the experiences of the user: " + this.newExp.owner )

        const contract = new Contract(wallet.account(), CONTRACT_ID, {
          viewMethods:  ['get_number_of_experiences', 'get_user_exp','get_experience'],
          sender: wallet.account()
        });

        // use a contract view method
        this.video_info = await contract.get_number_of_experiences();
        console.log( this.video_info );

        this.exp_list = await contract.get_user_exp({
          "wallet": this.newExp.owner
        });
        console.log( this.exp_list );

        for ( let i = 0 ; i < this.exp_list.length ; i++  ){

          this.exp_info = await contract.get_experience({
            video_n: this.exp_list[i]
          });
          console.log( this.exp_info );
          this.experienciesview[i] = this.exp_info;
          this.experienciesview[i].video_n = this.exp_list[i];
        }
        
        console.log( this.experienciesview );
        this.display_experiencies = true;
      } else {
        //<p> please signin as an active user </p>
                console.log("ExperienceView -- NOT SIGNED");
      }
    },
    goToMoment( video_id ){
      // in moment we use QUERY as a reference to pass information between the source page and the moment page
      // this.$router.push('/moment');
    // console.log("goToMoment\n");
      //if the route accepts params, you can also use
      this.$router.push({
        name:'moment', 
        params: {id: video_id  }, 
        query: { 
          'video_id' : video_id, 

          "url" : this.experienciesview[video_id - 1].url,
          "title" : this.experienciesview[video_id - 1].title,
          "description" : this.experienciesview[video_id - 1].description,
          "id" : this.experienciesview[video_id - 1].id,
          "owner" : this.experienciesview[video_id - 1].owner,
          "reward" : this.experienciesview[video_id - 1].reward,

          "time" : this.experienciesview[video_id - 1].time,
          "moment" : this.experienciesview[video_id - 1].moment,

        }} );
    },
    goToPoV( video_id ){

      console.log( "video:id: " + video_id);

      // in moment we use param as a reference
      // in PoV we use PARAMETER as a reference to pass information between the source page and the moment page

    // this.$router.push('/moment');
    // console.log("goToPoV\n");
      //if the route accepts params, you can also use
      this.$router.push({
        name:'pov', 
        params: {video_id: video_id  }, 
        } );
    },

    closeExp () {
      this.new_experience = false;
    },

    async saveExp(){
      this.new_experience = false;

      console.log( "Save the Experience");

      const near = await connect(config);
      const wallet = new WalletConnection(near, 'SharingShard');

      const contract = new Contract( wallet.account(), CONTRACT_ID, 
      { 
        changeMethods:  ['set_experience'],
        sender: wallet.account(),
      });

      this.expInfo = await contract.set_experience(
        { 
        experience_name: this.newExp.title, 
        description: this.newExp.description,
        url: this.newExp.url,
        reward: parseInt(this.newExp.rewards),
        moment: this.newExp.moment,
        time: parseInt(this.newExp.time),
        expire_date: this.newExp.expire_date,
        topic: this.newExp.topic,
        }, 
        300000000000000,
        0
      );

      this.statusT = "Experiencia: " + this.expInfo;
      console.log( this.expInfo );
    },



  },  
}
</script>
