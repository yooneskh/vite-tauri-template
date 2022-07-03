import { createApp } from 'vue';

import vuetify from './plugins/vuetify';
import routes from './routes';

import App from './app.vue';
import './assets/main.css';
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-flash";

import 'vue-global-api/ref';
import 'vue-global-api/reactive';
import 'vue-global-api/computed';
import 'vue-global-api/watch';
import 'vue-global-api/watchEffect';



const app = createApp(App);

app.use(VueVideoPlayer);

app.use(routes);
app.use(vuetify);
app.mount('#app');
