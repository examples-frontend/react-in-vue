<template>
  <div id="main">
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view />
</div>
</template>

<style>
#main {
  color: #35495E;
  background: #41B883;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>