<template>
  <div id="thread-extension-container">
    <ThreadList />
  </div>
</template>

<script>
  import ThreadList from './components/ThreadList.vue';

  export default {
    name: 'App',
    components: {
      ThreadList,
    },
  };
</script>

<style lang="scss" scoped>
  #thread-extension-container {
    position: absolute;
    right: 3vw;
    top: 16vh;
    max-width: 25vw;
    z-index: 10;
  }
</style>
