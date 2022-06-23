<script setup>

// import Counter from '../../components/counter.vue';
// import ColorChecker from '../../components/color-checker.vue';
// import Requester from '../../components/requester.vue';
import { moduleExpression } from '@babel/types';
import Banner from '../../components/banner.vue';
// import Requester from '../../components/requester.vue';
import Trending from '../../components/trending.vue';
 
function toggleDarkMode() {
   // check if dark mode is enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        // if enabled, set to disabled
        localStorage.setItem('darkMode', 'disabled');
    } else {
        // if disabled, set to enabled
        localStorage.setItem('darkMode', 'enabled');
    }
    // if dark mode is enabled in the local storage, replace all the v-theme--dark by v-theme--light on all the divs
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.querySelectorAll('.v-theme--dark').forEach(div => {
            div.classList.replace('v-theme--dark', 'v-theme--light');
        });
    } else {
        // if dark mode is disabled in the local storage, replace all the v-theme--light by v-theme--dark on all the divs
        document.querySelectorAll('.v-theme--light').forEach(div => {
            div.classList.replace('v-theme--light', 'v-theme--dark');
        });
    }
}
toggleDarkMode



</script>

<template>
    <banner></banner>
    <!-- <requester></requester> -->
    <trending></trending>
    <v-btn class ="toggle-dark-mode" @click="toggleDarkMode">Toggle Dark Mode</v-btn>

</template>
