<script setup>

// import Counter from '../../components/counter.vue';
// import ColorChecker from '../../components/color-checker.vue';
// import Requester from '../../components/requester.vue';
import { moduleExpression } from '@babel/types';
import Banner from '../../components/banner.vue';
// import Requester from '../../components/requester.vue';
import Trending from '../../components/trending.vue';
import DarkModeToggle from '../../components/DarkModeToggle.vue';



</script>

<template>

        <banner elevate-on-scroll></banner>
    <!-- <requester></requester> -->
    
    <DarkModeToggle></DarkModeToggle>
    <trending></trending>


</template>
