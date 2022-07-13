<template>
  <div class="about">
    <h1 class="subheading grey--text">Guardar un PoV</h1>
    <p>Probando como guardar un PoV</p>
    <v-container class="my-5">
      <p>rollo de prueba</p>
    <!--  <p>Title: <span> {{ exp_info.title }}</span></p> -->


           


  </v-container>
</div>


</template>

<script>
  import * as nearAPI from 'near-api-js'
  const { connect, WalletConnection, keyStores, Contract } = nearAPI;

  const CONTRACT_ID = "dev-1656920990559-86772243239643";
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

  created(){
    this.insert_pov();
  },  


    data(){
      return {
        result_num: 0,
        result_string: "",
        exp_info: "",
      }
    },

    methods: {
      async insert_pov(){
        const near = await connect(config);
        const wallet = new WalletConnection(near, 'ss');

        const contract = new Contract(wallet.account(), CONTRACT_ID, {
            viewMethods: ['get_experience'],
            changeMethods:  ['set_pov'],
            sender: wallet.account()
        });
/*
        // ---------------------------------
        this.exp_info = await contract.get_experience({
          video_n: 2 // video_id
        });

        console.log( "Experience: " + this.exp_info);
        // ---------------------------------
*/
       
        console.log( this.exp_info.pov.length );
        console.log( wallet.getAccountId());
        
        if ( this.exp_info.pov.length == 0 ){  // No hay ningun comentario
          console.log( "insertando ...... ")
            this.exp_info = await contract.set_pov({
              video_n: 2, //video_id,
              wallet: wallet.getAccountId(),
              pov: "Este es un comenteario" // this.ss_pov_moment
          });
        

          console.log("Comentario insertado" + this.exp_info);
        }
      },
    },
  }

</script>