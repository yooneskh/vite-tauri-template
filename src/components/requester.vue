<script setup>

import { YNetwork } from 'ynetwork';

const url = ref('https://google.com');
const loading = ref(false);
const result = ref('');
const others = ref({});

async function makeRequest() {

  loading.value = true;
  const { status, data: requestData, headers } = await YNetwork.get(url.value);
  loading.value = false;

  result.value = requestData;
  others.value = { status, headers };

}

</script>

<template>
  <v-card>

    <v-card-title>

      GET

      <input type="text" v-model="url" />

      <v-btn color="primary" :loading="loading" @click="makeRequest">
        Make Request {{ loading ? '...' : '' }}
      </v-btn>

    </v-card-title>

    <pre class="pa-2 bg-grey-lighten-4" style="white-space: pre-wrap; overflow-x: auto;">{{ others }}</pre>
    <pre class="pa-2 mt-2 bg-grey-lighten-4" style="white-space: pre-wrap; overflow-x: auto;">{{ result }}</pre>

  </v-card>
</template>

<style scoped>
  .box {
    margin: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  .infos {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  input {
    flex-grow: 1;
    margin-left: 8px;
    margin-right: 8px;
    padding: 4px;
  }
  .result {
    white-space: pre-wrap;
  }
</style>
