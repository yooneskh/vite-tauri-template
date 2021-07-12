<script setup>

const count = ref(0);
const doubledCount = computed(() => count.value * 2);

function addCount() {
  count.value++;
}

</script>

<template>
  <v-card>

    <v-card-title>

      <v-icon class="me-3">mdi-plus</v-icon>
      Counter

      <v-spacer />

      <v-btn flat color="primary" @click="addCount">
        Count Up
      </v-btn>

    </v-card-title>

    <v-card-text class="pb-0 mb-0">
      <h1 class="text-h2 text-center">
        "{{ count }}"
      </h1>
    </v-card-text>

    <v-card-text class="pt-0">
      <div class="caption text-center">
        Double is {{ doubledCount }}
      </div>
    </v-card-text>

  </v-card>
</template>
