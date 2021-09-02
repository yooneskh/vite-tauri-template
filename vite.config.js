import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  define: {
    'process.env': {}
  },
  rollupOptions: {
  	output: {
  	  inlineDynamicImports: true
  	}
  },
});
