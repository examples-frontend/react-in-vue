<template>
    <div id="vue-home">
        <h1>This is home page</h1>
        <div ref="reactNode"></div>
    </div>
</template>

<script setup>
import render from '../react-in-vue';
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue'

const reactNode = ref(null);


let reactApp = null;

  onMounted(() => {
    reactApp = render(reactNode.value);
    console.log('Mounted');
  })

  onUnmounted(() => {
    if( reactApp) {
      reactApp();
      console.log('Unmounted');
    }
  })
</script>

<style>
/* #vue-home {
  background: #FF00FF;
} */

</style>