<script setup>

import Counter from '../../components/counter.vue';
import ColorChecker from '../../components/color-checker.vue';
import Requester from '../../components/requester.vue';

</script>

<template>
  <v-container class="page">

    <counter />

    <color-checker class="mt-3" />

    <requester class="mt-3" />

    <v-btn block flat color="info" class="mt-3" to="/about-us">
      Go To About Us
    </v-btn>

  </v-container>
</template>
