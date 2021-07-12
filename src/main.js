import { createApp } from 'vue';

import vuetify from './plugins/vuetify';
import routes from './routes';
import App from './app.vue';

import './plugins/configure-ynetwork';

import 'vue-global-api/ref';
import 'vue-global-api/reactive';
import 'vue-global-api/computed';
import 'vue-global-api/watch';
import 'vue-global-api/watchEffect';


const app = createApp(App);

app.use(routes);
app.use(vuetify);

app.mount('#app');
