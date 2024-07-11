<template>
    <div id="vue-home">
        <h1>👋Hello world🌎</h1>
        <div  ref="reactNode" ></div>
    </div>
</template>

<script setup>
import render from '../react-in-vue';
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue'

const reactNode = ref(null);


let reactApp = null;

  onMounted(() => {
    reactApp = render(reactNode.value)
  })

  onUnmounted(() => {
    console.log(reactApp);
  })
</script>