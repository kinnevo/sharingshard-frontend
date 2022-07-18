<template>
<div class="momentview">
<v-main fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="subheading grey--text">Moment</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Define a moment in a video that helps to understand a challenge</p>
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
            <v-text-field v-model="ss_moment_moment_time">
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
                v-model="ss_moment_moment"                         

                name="input-7-4"
                label="Moment"
                value=ss_moment_moment_time
                auto-grow
                rows="15"
                row-height="15"
              ></v-textarea>

            </v-col>
          </v-row>
        </v-col>
      </v-row>
    
      <v-row>
        <v-col class="pa-6" >
          <p>URL del video:</p><span>{{url_experiencia}}</span> ---- {{ss_moment_moment}} ---- is here

        </v-col>

        <div v-if= edit_by_owner>

          <v-col class="pa-6">  
            <v-row>
              <v-col>
                <v-btn class="pa-2"
                  depressed
                  color="primary"
                  @click=clickea_insert_moment
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
        </div>
      </v-row>
    </v-main>

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
    name: "MomentView",
    created(){
      console.log("created: " + window.location.href);

      //console.log("created2: " + this.$route.params.video_id);

      this.video_id = this.$route.query.video_id;

      this.url_experiencia = this.$route.query.url,
            console.log( this.url_experiencia );

      this.title = this.$route.query.title,
      this.description = this.$route.query.description,
      this.id = this.$route.query.id,
      this.owner = this.$route.query.owner,
      this.reward = this.$route.query.reward,

      this.ss_moment_moment_time = this.$route.query.time,
      this.ss_moment_moment=this.$route.query.moment,

      this.disp_experiences();
    },
    updated(){
        console.log("updated: " + window.location.href);
    },


    data(){
      return {
        video_info: 0,
        exp_info: "",

        url: "",
        title: "",
        description: "",
        id: 0,
        owner: "",
        reward: 0,

        ss_moment_moment_time: 0,
        ss_moment_moment: "",

        edit_by_owner: false,

      }
    },

    methods: {
      async disp_experiences(){
        
        const near = await connect(config);
        const wallet = new WalletConnection(near, 'ss');

        const contract = new Contract(wallet.account(), CONTRACT_ID, {
          viewMethods:  ['get_experience'],
          sender: wallet.account()
        });

        this.exp_info = await contract.get_experience({
          video_n: this.video_id
        });
        if ( this.exp_info.owner == this.owner)
          this.edit_by_owner = true;

        console.log( this.exp_info );
        
      },
      async clickea_insert_moment(){

        const near = await connect(config);
        const wallet = new WalletConnection(near, 'SharingShard');

        const contract = new Contract( wallet.account(), CONTRACT_ID, 
        { 
          changeMethods:  ['set_moment_comment'],
          sender: wallet.account(),
        });

        this.expInfo = await contract.set_moment_comment(
          { 
          video_n: this.video_id,
          comment: this.ss_moment_moment
          }, 
          300000000000000,
          0
        );

        this.statusT = "set_moment_comment result: " + this.expInfo;
        console.log( this.expInfo );

        console.log( "clickea_insert_moment");
      },
      clickea_edit_moment(){
        console.log( "clickea_edit_moment");
      },
      clickea_delete_moment(){
        console.log( "clickea_delete_moment");
      },

    },
  }
</script>
