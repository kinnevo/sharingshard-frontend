import Vue from 'vue'
import App from './App.vue'


import vuetify from './plugins/vuetify'
import router from './router'

global.Buffer = global.Buffer || require("buffer").Buffer;

import LazyTube from "vue-lazytube";

Vue.use(LazyTube);

import { createPinia } from 'pinia';

const pinia = createPinia();
Vue.use(pinia);




// global variable

/*
import globalConstants from "./globalConstant"
import * as nearAPI from 'near-api-js'
const {keyStores} = nearAPI;

Vue.prototype.$CONTRACT_ID = "dev-1658426475128-11579451230587";
Vue.prototype.$config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
};
*/

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
