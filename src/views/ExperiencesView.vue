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

            <!-- Activate experience -->

            <v-dialog
              v-model="dialogActivation"
              max-width="1000px"
              >

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Activate the Experience and Deposit the Money for the Reward
                </v-card-title>

                <v-card-text>
                    <v-row>
                      <v-col>
                        <v-text-field class="text-right"
                          v-model="newExpActivation.rewards"
                          label="Deposit"
                          suffix="Nears"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field class="text-right"
                          v-model=feex
                          label="Activation Fee"
                          suffix="Nears"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field class="text-right"
                          v-model=totalx
                          label="Rewards"
                          suffix="Nears"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeExpActivation"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveExpActivitation"
                  >
                    Activate
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-col>
          </v-row>
        </v-container>
      </v-toolbar-title>


      <v-row id=top_card>
      <!--
        <v-col xs12 sm6 md4 lg3 v-for="item in experienciesview.length" :key="item">
      -->
        <v-col cols="12" md="3" v-for="item in experienciesview.length" :key="item">
          <v-card>
            <v-responsive>
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

          <v-card-actions>
            <div v-if="experienciesview[item-1].status=='Active'" class="red white--text mx-auto elevation-6 rounded-lg" ><b>Active</b></div>
            <div v-if="experienciesview[item-1].status=='InProcess'" class="green white--text mx-auto elevation-6 rounded-lg" ><b>InProcess</b></div>
            <div v-if="experienciesview[item-1].status=='Closed'" class="black white--text mx-auto elevation-6 rounded-lg" ><b>Closed</b></div>

            <v-btn v-show="experienciesview[item-1].status=='InProcess'" text color="grey" @click="goToAction( experienciesview[item-1].video_n, 'InProcess' )">
              <span class="">Activate</span>
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

const { connect, WalletConnection, keyStores, Contract, utils } = nearAPI;

const CONTRACT_ID = "dev-1658426475128-11579451230587";
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
    this.users_value = "My Experiences";

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

      newExpActivation: {
          video_n: 0,
          rewards: 0,
          fee: 0,
          total: 0,
      },

      dialogActivation: false,

    }
  },

  computed: {

      feex: function() {
         return parseFloat(this.newExpActivation.rewards * 0.1).toFixed(2);
      },

      totalx: function() {
        return (parseFloat(this.newExpActivation.rewards)-parseFloat(this.newExpActivation.rewards * 0.1 )).toFixed(2);
      }
    },

  methods: {

    goToAction( exp_num, action){
      this.newExpActivation.video_n = exp_num;
      exp_num = action;
      action = exp_num;
      this.dialogActivation = true;
    },

    async saveExpActivitation(){

      const near = await connect(config);
      const wallet = new WalletConnection(near, 'SharingShard');

      const contract = new Contract( wallet.account(), CONTRACT_ID, 
      { 
        changeMethods:  ['activate_experience'],
        viewMethods: ['get_experience'],
        sender: wallet.account(),
      });

      this.exp_info = await contract.get_experience({
        video_n: this.newExpActivation.video_n // video_id
      });

//const amountInYocto = utils.format.parseNearAmount("10");

      this.expInfo = await contract.activate_experience(
        { 
          video_n : this.newExpActivation.video_n,
        }, 
        300000000000000,
        utils.format.parseNearAmount(this.totalx.toString()) )
      .catch((err) => {
        alert ( err );
        return err;
      });
      this.dialogActivation = false;
    },


    closeExpActivation(){
      this.dialogActivation = false;
    },

    select_user(item) {
      
      const parent = document.querySelector('#top_card');
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }

      this.users_value = item;
      this.disp_experiences(this.users_value);
    },


    /*
    * Display de experiences of the owner 
    * -1 -- means current signed user
    */
    async disp_experiences( exp_owner ){
      this.display_experiencies=false;
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
        console.log( "get_number_of_experiences" + this.video_info );

        this.exp_list = await contract.get_user_exp({
          "wallet": this.newExp.owner
        });
        console.log( this.exp_list );
        this.experienciesview = [""];

        for ( let i = 0 ; i < this.exp_list.length ; i++  ){
          console.log( this.exp_list.length );

          this.exp_info = await contract.get_experience({
            video_n: this.exp_list[i]
          });
          console.log( this.exp_info );

/*
 *  here we validate if the experiences are from the user and allow to closed or activate 
 *  Eperiences from other users are only show the ones that are active
 * 
 *  Display my own experiences
 */

          // if ( this.exp_info.status == "Active") {
            this.experienciesview[i] = this.exp_info;
            this.experienciesview[i].video_n = this.exp_list[i];
          // }

/*
 *  Display the active experiences from other users
 */

        }
        console.log( this.experienciesview );
      } else {
        //<p> please signin as an active user </p>
                console.log("ExperienceView -- NOT SIGNED");
      }
      this.display_experiencies=true;
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
