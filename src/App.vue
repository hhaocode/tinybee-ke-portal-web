<template>
  <div id="app">
    <transition :name="$router.transitionName">
      <router-view />
    </transition>
    <!-- <dialog></dialog> -->
  </div>
</template>

<style>
.app {
  background-color: #f3f5f6;
}
</style>
