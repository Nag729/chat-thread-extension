import { FontAwesomeIcon } from '@/plugins/font-awesome';
import { createApp } from 'vue';
import App from './App.vue';

const setupExtension = () => {
  // add empty div tag to DOM
  const element = document.querySelector('body');
  const createdDom = document.createElement('div');
  createdDom.id = 'thread-extension-container';
  element.insertAdjacentElement('beforeend', createdDom);

  // create Vue instance
  createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#thread-extension-container');
};

setupExtension();
