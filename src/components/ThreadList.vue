<template>
  <div>
    <p>Hello Chrome Extension By Vue.js 3.0</p>
    <p>{{ state.massage }}</p>
  </div>
</template>

<script>
  import { onMounted, reactive, defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      const state = reactive({
        message: 'init',
      });

      onMounted(() => {
        console.log('mounted!');
      });

      return {
        state,
      };
    },
  });
</script>
