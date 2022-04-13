import { createApp } from 'vue';
const app = createApp(App);


import { vuetify } from './plugins/vuetify';
app.use(vuetify);

import { unifiedApp } from './plugins/unified-app';
app.use(unifiedApp);


import App from './app.vue';
app.mount('#app');
