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
