<script setup>

// import Counter from '../../components/counter.vue';
// import ColorChecker from '../../components/color-checker.vue';
// import Requester from '../../components/requester.vue';
import { moduleExpression } from '@babel/types';
import Banner from '../../components/banner.vue';
// import Requester from '../../components/requester.vue';
import Trending from '../../components/trending.vue';

 
function toggleDarkMode() {
    if (document.querySelector('.toggle-dark-mode').dataset.boolean == 'false'){
        // take all the elements with v-light in the class and change the class to v-dark
        document.querySelectorAll('.v-theme--light').forEach(function(element){
            //if the element is a button.toggle-dark-mode then change the text to toggle light mode back
            element.classList.replace('v-theme--light', 'v-theme--dark')
            if(element.classList.contains('toggle-dark-mode')){
                element.innerHTML = 'Toggle Light Mode';
                element.classList.replace('v-theme--dark', 'v-theme--light');
            }
        });
        document.querySelector('.toggle-dark-mode').dataset.boolean = true;
        localStorage.setItem('darkMode', 'true');
    } else {
        // change all the v-dark to v-light and set the data-boolean to false
        document.querySelectorAll('.v-theme--dark').forEach(function(element){
            element.classList.replace('v-theme--dark', 'v-theme--light');
            if(element.classList.contains('toggle-dark-mode')){
                element.innerText = 'Toggle Dark Mode';
                element.classList.replace('v-theme--dark', 'v-theme--light');
            }
        });
        document.querySelector('.toggle-dark-mode').dataset.boolean = false
        localStorage.setItem('darkMode', 'false');
    }
}

</script>

<template>
    <banner></banner>
    <!-- <requester></requester> -->
    <v-btn class ="toggle-dark-mode" @click="toggleDarkMode" data-boolean="false">Toggle Dark Mode</v-btn>
    <trending></trending>
    

</template>
