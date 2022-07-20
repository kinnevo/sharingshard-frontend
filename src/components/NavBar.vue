<template>
  <v-toolbar text>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Sharing</span>
        <span class="font-weight-black">Shard</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <span v-for="command in commands" :key="command.text" >
            <v-btn router :to="command.route" text :color="command.color" >{{ command.text }}</v-btn>
      </span>

      <v-btn text color="grey" @click=login_action>
        <span>{{ this.login_status }}</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
import * as nearAPI from 'near-api-js'
const { connect, WalletConnection, keyStores } = nearAPI;

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
    name: 'NavBar',
  data() {
    return {
      drawer: false,
      login_status: "Logout",
      user_logged: "",
      commands: [
        { color: "green", text: 'Experiences', route: '/experiences'},
        { color: "blue", text: 'Moment', route: '/moment'},
        { color: "red", text: 'Points of View', route: '/pov'},
        { color: "brown", text: 'Test', route: '/about'},
      ]
    }
  },
  created(){
    this.is_Logged();
  },

  methods: {
    async login_action() {
        const near = await connect(config);
        const wallet = new WalletConnection(near, 'SharingShard');

        if (this.login_status == "Login") {
                    wallet.requestSignIn( CONTRACT_ID, 'SharingShard');
          this.user_logged = wallet.getAccountId();
          this.login_status = this.user_logged;  //"Logout"
          console.log( "Logout");
        }else {
          wallet.signOut();
          this.login_status = "Login";
          console.log( "Login " ); 
        }
    },
    async is_Logged() {
//        const { connect, keyStores, WalletConnection } = nearAPI;

        const near = await connect(config);
        const wallet = new WalletConnection(near, 'SharingShard');

        if (wallet.isSignedIn()) {
          this.user_logged = wallet.getAccountId();
          this.login_status = this.user_logged;
        } else {
          this.login_status = "Login";          
        }
    }

  }
}
</script>

<style>

</style>
