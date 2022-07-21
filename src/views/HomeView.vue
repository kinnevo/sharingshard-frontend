<template>
<div class="home">
  <v-container>
    <v-row no-gutters>
      <v-col md="6">
        hola
      </v-col>
      <v-col md="6">
        bien
      </v-col>
    </v-row> 

    <v-row no-gutters>
      <v-col md="4">
        hola
      </v-col>
      <v-col md="4">
        bien
      </v-col>
        <v-col md="4">
        tercera
      </v-col>
    </v-row> 

    <v-row no-gutters>
      <v-col class="pa-3">
        hola
      </v-col>
      <v-col class="pa-3">
        bien
      </v-col>
      <v-col class="pa-3">
        tercera
      </v-col>
      <v-col class="pa-3">
        cuarta
      </v-col>
    </v-row> 
  </v-container>

  <v-row>
    <v-col md="6">
      <v-container class="my-5">
        <h1>SharingShard</h1>
        <h2>Welcome</h2>
        <h2>Register</h2>
        <h2>Collaborate as a Experience Producer</h2>
        <h2>Collaborate with your Points of View</h2>
        <h2>Monetize your knowledge</h2>
        <h2>Be part of our community ok knowledge producers</h2>
      </v-container>
    </v-col>
    <v-col md="6">
    <p>User Logged: {{ user_logged }}</p>
    <p>Login status: {{login_status}}</p>

      <v-container v-if=!this.login_status_b>
        <h2>Sign or create an account - No Logged</h2>
      </v-container>


      <v-container  v-if=this.login_status_b>
        <h2>Logged</h2>
      </v-container>

    </v-col>
    </v-row>
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
    }
  },

  created(){
    this.is_Logged();
  },

  methods: {
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
