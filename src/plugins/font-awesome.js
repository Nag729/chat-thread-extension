import FontAwesomeIcon from '@/libs/FontAwesomeIcon.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRedo,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';

library.add(faToggleOn, faToggleOff, faRedo);

export { FontAwesomeIcon };
