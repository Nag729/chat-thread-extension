import { FontAwesomeIcon } from '@/plugins/font-awesome';
import { createApp } from 'vue';
import App from './App.vue';

// Google Chat が DOM を読み込んでから実行する
window.onload = () => {
  const element = document.querySelector('body > div');

  // メインの div に Vue を読み込ませる用のタグを追加
  const createdDom = document.createElement('div');
  createdDom.id = 'thread-extension';
  element.insertAdjacentElement('beforeend', createdDom);

  // Vue インスタンスの生成
  createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#thread-extension');
};
