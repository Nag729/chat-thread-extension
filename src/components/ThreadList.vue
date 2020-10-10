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
		<!-- TODO: v-showで表示・非表示切り替える -->
    <div>
      <ul
        :class="[
          'threads-list',
          state.isTransparent ? 'transparent-ul' : 'normal-ul',
        ]"
      >
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
        // initial load
        refreshThreads();

				// Observerを作成して後から読み込まれたスレッドにも対応する
				// TODO: 新しいスレッドを読み込んだ時にもスレッドを再読み込みする
        const observer = new MutationObserver(refreshThreads);
        observer.observe(document.getElementsByTagName('body')[0], {
          attributes: true,
        });
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
            let heading = el.innerHTML;

            // タイトルに`.`が入っていた場合に対応
            let title = '';
            const headArr = heading.split('.');
						const dotCnt = headArr.length;
						// TODO: 「未読」に対応する → 情報付け足す
            for (let i = 1; i <= dotCnt - 4; i++) {
              title += headArr[i];
            }

            // bold文字をreplace
            const regex = /\*/gi;
            title = title.replace(regex, '');

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

  .threads-list {
		// TODO: 上限を超えた場合だけスクロールさせる
    overflow: scroll;
    max-height: 60vh;
  }

  .normal-ul {
    opacity: 0.9;
  }

  .transparent-ul {
    opacity: 0.2;
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
