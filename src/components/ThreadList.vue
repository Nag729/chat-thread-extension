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
    <div v-show="!state.isTransparent">
      <ul :class="['threads-list']">
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
        // hide button
        isTransparent: false,
      });

      onMounted(() => {
        const delayRefresh = () => {
          setTimeout(refreshThreads, 300);
        };

        // roomの変更を監視
        const roomObserver = new MutationObserver(delayRefresh);
        roomObserver.observe(document.getElementsByTagName('body')[0], {
          attributes: true,
        });

        // // TODO: threadの変更を監視
        // const observedEl = document.querySelectorAll('[role="main"]')[0]
        //   .children[0].children[0].children[0];
        // const threadObserver = new MutationObserver(delayRefresh);
        // threadObserver.observe(observedEl, {
        //   attributes: true,
        //   childList: true,
        // });
      });

      // スレッド情報を取得してstateを更新する
      const refreshThreads = () => {
        // 情報の取得
        const headings = document.querySelectorAll('[role="heading"]');
        const headers = [];
        for (const el of headings) {
          if (el.hasAttribute('aria-label')) headers.push(el);
        }

        // clear
        state.threads = [];

        // スレッド情報を取得
        headers.forEach(el => {
          // タイトルから不要な情報を削除
          let heading = el.innerHTML;

          // タイトルの文字列を取得
          const headArr = heading.split('.');
          const idx = headArr[0].indexOf('未読') === -1 ? 1 : 2;
          let title = headArr[idx];

          // bold文字をreplace
          const regex = /\*/gi;
          title = title.replace(regex, '');

          // スレッド情報をstate.threadsに詰める
          const thread = {
            el: el,
            title: title,
          };
          state.threads.push(thread);
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

  .threads-list {
    overflow: auto;
    max-height: 60vh;
  }

  .normal-ul {
    opacity: 0.9;
  }

  #toggle-icon {
    top: -25px;
    right: 25px;
    width: 25px;
  }

  #reload-icon {
    top: -24px;
    right: 2px;
    width: 19px;
  }
</style>
