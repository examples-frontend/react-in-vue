<template>
    <div>
        <h1>This is the <b>about page</b></h1>
        <div>
            <p>Counter: {{ counter }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const counter = ref(0);

const updateCounter = () => {
  counter.value += 1;
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(updateCounter, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<style>
/* #vue-home {
  background: #FF00FF;
} */

</style>