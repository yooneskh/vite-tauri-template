<script setup>

import Counter from './components/Counter.vue';
import ColorChecker from './components/ColorChecker.vue';
import Requester from './components/Requester.vue';

</script>

<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container>

        <Counter />

        <ColorChecker class="mt-3" />

        <Requester class="mt-3" />

      </v-container>
    </v-main>
  </v-app>
</template>
