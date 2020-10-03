import { createApp } from 'vue';
import App from './App.vue';

(() => {
  const element = document.querySelector('body > div');
  console.log(element);

  const createdDom = document.createElement('div');
  createdDom.id = 'thread-extension';
  element.insertAdjacentElement('beforeend', createdDom);

  createApp(App).mount('#thread-extension');
})();
