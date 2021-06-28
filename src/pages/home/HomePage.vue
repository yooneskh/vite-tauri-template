<script setup>

import Counter from '../../components/Counter.vue';
import ColorChecker from '../../components/ColorChecker.vue';
import Requester from '../../components/Requester.vue';

</script>

<template>
  <v-container class="page">

    <Counter />

    <ColorChecker class="mt-3" />

    <Requester class="mt-3" />

    <v-btn block flat color="info" class="mt-3" to="/about-us">
      Go To About Us
    </v-btn>

  </v-container>
</template>
