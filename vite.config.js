import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';


export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    })
  ]
});
