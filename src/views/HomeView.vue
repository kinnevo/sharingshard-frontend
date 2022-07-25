<template>
<div class="home" :key="home_refresh">
  <v-container>
    <v-row>
      <v-col md="12">
        <v-container class="my-5">
          <h1>SharingShard</h1>
          <h2 class="blue white--text">Monetize youy knowledge and experience<br>helping people to solve problems</h2>
          <h3>Welcome</h3>
          <h3>Register</h3>
          <h3>Collaborate as an Experience Producer</h3>
          <h3>Collaborate with your Points of View</h3>
          <h3>Monetize your knowledge</h3>
          <h3>Be part of our community of knowledge producers</h3>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col md="12">
      <p>User Logged: {{ user_logged }}</p>
      <p>Login status: {{login_status}}</p>

        <v-container v-if=!this.login_status_b>
          <p><a :href="nearWallet">Sign</a> or <a :href="createWallet">Create an account</a></p>
        </v-container>


        <v-container  v-if=this.login_status_b>
          <h2>Logged</h2>
        </v-container>

      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row md-12>
      <v-col md-6>
        <v-card
          class="mx-auto my-12"
          max-width="500"
        >
        <v-card-title>Be an experience producer</v-card-title>

          <v-img
                height="500"
                src="../assets/600x600.png"
          ></v-img>
        </v-card>

      </v-col>

      <v-col md-6>
        <v-card-text>
          <v-row
            align="start"
            class="mx-0"
          >
            <div class="textBoxLeft">An experience is integrated by a video and a moment that is marked as point in time within the video, where you have a reference to the context that helps people to undersand the problem to be solved</div>
            <div class="textBoxLeft">People provide points of view about the challenge shown at the moment</div>
            <div class="textBoxLeft">Each moment has assigned a reward for the best Point of View that is allocated by the creator of the experience.</div>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>


  <v-container>
    <v-row md-12>
      <v-col md-6>
            <v-card-text>
              <v-row
                align="start"
                class="mx-0"
              >

              <div class="textBoxLeft">An experience is integrated by a video and a moment that is marked as point in time within the video, where you have a reference to the context that helps people to undersand the problem to be solved</div>
              <div class="textBoxLeft">People provide points of view about the challenge shown at the moment</div>
              <div class="textBoxLeft">Each moment has assigned a reward for the best Point of View that is allocated by the creator of the experience.</div>
              </v-row>
            </v-card-text>

      </v-col>

      <v-col md-6>
        <v-card
          class="mx-auto my-12"
          max-width="500"
        >
        <v-card-title>Collaborate with your Points of View</v-card-title>

          <v-img
                height="500"
                src="../assets/600x600.png"
          ></v-img>
        </v-card>

      </v-col>


    </v-row>
  </v-container>



  <v-container>
    <v-row md-12>
      <v-col md-6>
        <v-card
          class="mx-auto my-12"
          max-width="500"
        >
        <v-card-title>Monetize your knowledge</v-card-title>

          <v-img
                height="500"
                src="../assets/600x600.png"
          ></v-img>
        </v-card>

      </v-col>

      <v-col md-6>
        <v-card-text>
          <v-row
            align="start"
            class="mx-0"
          >
            <div class="textBoxLeft">TRESTRES An experience is integrated by a video and a moment that is marked as point in time within the video, where you have a reference to the context that helps people to undersand the problem to be solved</div>
            <div class="textBoxLeft">People provide points of view about the challenge shown at the moment</div>
            <div class="textBoxLeft">Each moment has assigned a reward for the best Point of View that is allocated by the creator of the experience.</div>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>


  <v-container>
    <v-row md-12>
      <v-col md-6>
            <v-card-text>
              <v-row
                align="start"
                class="mx-0"
              >

              <div class="textBoxLeft">An experience is integrated by a video and a moment that is marked as point in time within the video, where you have a reference to the context that helps people to undersand the problem to be solved</div>
              <div class="textBoxLeft">People provide points of view about the challenge shown at the moment</div>
              <div class="textBoxLeft">Each moment has assigned a reward for the best Point of View that is allocated by the creator of the experience.</div>
              </v-row>
            </v-card-text>

      </v-col>

      <v-col md-6>
        <v-card
          class="mx-auto my-12"
          max-width="500"
        >
        <v-card-title>Be part of our community</v-card-title>

          <v-img
                height="500"
                src="../assets/600x600.png"
          ></v-img>
        </v-card>

      </v-col>


    </v-row>
  </v-container>



</div>

</template>



<script>
import * as nearAPI from 'near-api-js'
const { connect, WalletConnection, keyStores } = nearAPI;

// const CONTRACT_ID = "dev-1658426475128-11579451230587";
const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  createWalletUrl: 'https://wallet.testnet.near.org/create',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
};


export default {
  name: 'HomeView',

  data() {
    return {
      user_logged: "none",
      login_status: "Logut",
      login_status_b: false,

      createWallet: "",
      nearWallet: "",

      home_refresh: 0,
    }
  },

  created(){
    this.nearWallet = config.walletUrl;
    this.createWallet = config.createWalletUrl;
    this.is_Logged();
  },

  methods: {

   forceRerender() {
      this.home_refresh += 1;
    },

    async is_Logged() {

        const near = await connect(config);
        const wallet = new WalletConnection(near, 'SharingShard');

        if (wallet.isSignedIn()) {
          this.user_logged = wallet.getAccountId();
          this.login_status = this.user_logged;
          this.login_status_b = true;          
        } else {
          this.login_status = "Logout"; 
          this.login_status_b = false;
        }
    },
  },

  components: {
    // HelloWorld
  }
}



</script>
<style>
  .textBoxLeft {
    text-align:left;
  }
</style>