import { createApp } from 'vue';


import './assets/styles/app.scss';
import App from './app.vue';
const app = createApp(App);


import { vuetify } from './plugins/vuetify';
app.use(vuetify);

import { unifiedApp } from './plugins/unified/unified-app';
app.use(unifiedApp);


app.mount('#app');
