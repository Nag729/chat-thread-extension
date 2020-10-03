<template>
  <div>
    <div class="icons">
      <!-- toggle button -->
      <fa
        id="toggle-icon"
        :icon="state.isTransparent ? 'toggle-off' : 'toggle-on'"
        @click="state.isTransparent = !state.isTransparent"
      ></fa>
      <!-- reload button -->
      <fa id="reload-icon" icon="redo" @click="refreshThreads"></fa>
    </div>
    <!-- threads list -->
    <div>
      <ul :class="state.isTransparent ? 'transparent-ul' : 'normal-ul'">
        <li
          v-for="(thread, idx) in state.threads"
          :key="idx"
          @click="scrollToThread(thread.el)"
        >
          {{ thread.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      const state = reactive({
        // スレッド情報を保持
        threads: [],
        isTransparent: false,
      });

      onMounted(() => {
        refreshThreads();
      });

      // スレッド情報を取得してstateを更新する
      const refreshThreads = () => {
        // clear
        state.threads = [];

        const headings = document.querySelectorAll('[role="heading"]');
        headings.forEach(el => {
          // スレッド情報を取得
          const isHeader = el.hasAttribute('aria-label');
          if (isHeader) {
            // タイトルから不要な情報を削除
            let title = el.innerHTML;
            const regex = /\*/gi;
            title = title.split('.')[1].replace(regex, '');

            // スレッド情報をstate.threadsに詰める
            const thread = {
              el: el,
              title: title,
            };
            state.threads.push(thread);
          }
        });
      };

      // スレッド名をクリックした時にその要素までスクロールする
      const scrollToThread = el => {
        el.scrollIntoView(true);
      };

      return {
        state,
        refreshThreads,
        scrollToThread,
      };
    },
  });
</script>

<style lang="scss" scoped>
  // https://saruwakakun.com/html-css/reference/ul-ol-li-design
  ul {
    padding: 0;
  }

  ul li,
  ol li {
    font-size: small;
    color: #404040;
    border-left: solid 6px #1fa67a; /*左側の線*/
    border-bottom: solid 2px #dadada; /*下に灰色線*/
    background: whitesmoke;
    margin-bottom: 5px; /*下のバーとの余白*/
    line-height: 1.5;
    padding: 0.5em;
    list-style-type: none !important; /*ポチ消す*/
  }

  .normal-ul {
    opacity: 0.8;
  }

  .transparent-ul {
    opacity: 0.2;
  }

  #toggle-icon {
    top: -12px;
    right: 2vw;
    width: 8%;
  }

  #reload-icon {
    top: -9px;
  }
</style>
