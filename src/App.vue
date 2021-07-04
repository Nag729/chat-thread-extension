<template>
  <div id="thread-list-container">
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
  #thread-list-container {
    position: absolute;
    right: 35px;
    top: 100px;
    width: 300px;
    z-index: 1;
  }
</style>
