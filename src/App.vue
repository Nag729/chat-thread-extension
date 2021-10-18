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
  // Hide thread-list when document (=iframe) width is narrow.
  @media screen and (max-width: 480px) {
    #thread-list-container {
      display: none;
    }
  }
  #thread-list-container {
    position: absolute;
    right: 35px;
    top: 100px;
    width: 300px;
    z-index: 950; // z-index of floating container is 997. Display this further back than that.
  }
</style>
