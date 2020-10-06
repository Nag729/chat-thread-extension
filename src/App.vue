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
    right: 35px;
    top: 100px;
    max-width: 300px;
    z-index: 1;
  }
</style>
