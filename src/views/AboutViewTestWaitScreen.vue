<!-- sample of dialogs: https://codesandbox.io/s/01m93q56l0?file=/src/App.vue -->
<template>
  <div class="about">
    <h1 class="subheading grey--text">Display a waiting message while saving in blockchain</h1>

      <p>User info: {{setUserStatus}} </p>
      <p>Discord: {{Discord}}</p>


      <v-dialog
        v-model="waitDialog"
        max-width="1500px"
        no-click-animation
        persistent
        close-delay=100
        overlay-color="red"
        >

        <v-card>
          <v-card-title class="text-h5 orange black--text lighten-2">
            Accesing the Blockchanin
          </v-card-title>

          <v-card-text>
            <v-container>
              <br>
              <p class="textBoxLeft">We are hard-working visiting the blockchain, please be patient while we do the request that you ask.</p>
              <br>
            </v-container>
          </v-card-text>

        </v-card>
      </v-dialog>

      <v-dialog
        v-model="changeDiscordDialog"
        max-width="1000px"
        >

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Update your Discord User 
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="Discord"
                  label="Discord"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="canceUpdateDiscord()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="updateDiscord()"
            >
              Create
            </v-btn>
          </v-card-actions>


        </v-card>
      </v-dialog>
  </div>


</template>

<script>
  import * as nearAPI from 'near-api-js'
  const { connect, WalletConnection, keyStores, Contract } = nearAPI;

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
    name: "AboutView",




    data(){
      return {
        changeDiscordDialog: true,
        waitDialog: false,
        userName: "amigo",
        Discord: "set a name",
        setUserStatus: "empty",
      }
    },

    methods: {

      async updateDiscord(){

        this.waitDialog = true;

        const near = await connect(config);
        const wallet = new WalletConnection(near, 'SharingShard');

        const contract = new Contract( wallet.account(), CONTRACT_ID, 
        { 
          changeMethods: ['set_user_discord'],
          viewMethods: ['get_user'],
          sender: wallet.account(),
        });


        this.setUserStatus = await contract.get_user({
          wallet: "zavala55.testnet"
        });


        this.setUserStatus = await contract.set_user_discord({
          discord: "zavala55 -- discord"
        });


        


        console.log( this.setUserStatus );
        this.changeDiscordDialog = false;
        this.waitDialog = false;

      },

      canceUpdateDiscord() {
        this.changeDiscordDialog = false;
      }
    },
  }
</script>

<style>
.buttons00 {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

}

.textBoxLeft {
  text-align:center;
  font-size: 24px
}
</style>