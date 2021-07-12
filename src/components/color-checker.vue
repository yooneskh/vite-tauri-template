<script setup>

const color = ref('lightblue');

</script>

<template>
  <v-card>
    <v-card-text>

      Change the color: <input type="text" v-model="color" class="pa-1 rounded" />

      <div class="box pa-12 mt-3 rounded" />

    </v-card-text>
  </v-card>
</template>

<style scoped>
  .box {
    background-color: v-bind(color);
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  input {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>