<script setup>
import Banner from '../../components/banner.vue';

</script>

<template>
    <banner></banner>
  <v-container class="page text-center">

    <h1 class="text-h4" >
      C'EST PAS PRÊT
    </h1>

    <v-btn color="primary" @click="goBack" class="mt-3">
      Revenir en arrière
    </v-btn>

  </v-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
h1{
  color: white;
}
</style>
