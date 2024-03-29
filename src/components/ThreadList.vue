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
  /* eslint-disable no-undef */
  import { onMounted, reactive, defineComponent } from 'vue';

  const UNREAD_TEXT_LIST = [`未読`, `Unread`];
  const SPACE_MANAGER_TEXT_LIST = [`スペースの管理者`, `Space Manager`];

  export default defineComponent({
    setup() {
      const state = reactive({
        threads: [],
        isTransparent: false,
      });

      onMounted(() => {
        const delayRefresh = () => {
          // implementation was changed to `iframe` and the load timing became slower,
          // so the delay time was increased.
          setTimeout(refreshThreads, 1000);
        };

        // watch change of room.
        const roomObserver = new MutationObserver(delayRefresh);
        // change target tag.
        roomObserver.observe(document.getElementsByTagName('body')[0], {
          attributes: true,
        });
      });

      /**
       * find title-index considering unread & space-manager
       *
       * NOTE: HEADER PATTERN
       * 1. unread, space-manager neither exists:
       *   - `USER_NAME. THREAD_TITLE. たった今. 1 件の返信`
       * 2. only unread exists:
       *   - `未読 1 件. USER_NAME. THREAD_TITLE. たった今. 1 件の返信`
       * 3. only space-manager exists:
       *   - `USER_NAME. スペースの管理者. THREAD_TITLE. 5 分. 1 件の返信`
       * 4. both unread and space-manager exist:
       *   - `未読 1 件. USER_NAME. スペースの管理者. THREAD_TITLE. たった今. 1 件の返信`
       */
      const findTitleIndex = headerList => {
        const unreadCheckIndex = 0;
        const hasUnread = UNREAD_TEXT_LIST.some(text =>
          headerList[unreadCheckIndex].includes(text)
        );

        const spaceManagerCheckIndex = hasUnread ? 2 : 1;
        const hasSpaceManager = SPACE_MANAGER_TEXT_LIST.some(text =>
          headerList[spaceManagerCheckIndex].includes(text)
        );

        const titleIndex = (hasUnread ? 1 : 0) + 1 + (hasSpaceManager ? 1 : 0);
        return titleIndex;
      };
      /**
       * get thread information and update state.
       */
      const refreshThreads = () => {
        const headings = document.querySelectorAll('[role="heading"]');
        const headers = [];
        for (const el of headings) {
          if (el.hasAttribute('aria-label')) headers.push(el);
        }

        // clear state
        state.threads = [];

        headers.forEach(el => {
          let heading = el.innerHTML;

          // create title from heading
          const headerList = heading.split('. ');
          const title = headerList[findTitleIndex(headerList)];

          const regex = /\*/gi;
          const thread = {
            el: el,
            title: title !== undefined ? title.replace(regex, '') : '',
          };
          state.threads.push(thread);
        });
      };

      // when thread clicked, scroll to it
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
    border-left: solid 6px #1fa67a;
    border-bottom: solid 2px #dadada;
    background: whitesmoke;
    margin-bottom: 5px;
    line-height: 1.5;
    padding: 0.5em;
    list-style-type: none !important;
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
