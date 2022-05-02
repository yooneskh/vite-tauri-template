import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';


export const vuetify = createVuetify({
  theme: {
    variations: {
      colors: ['primary'],
      lighten: 3,
      darken: 3
    }
  }
});
