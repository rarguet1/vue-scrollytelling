import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';


const debounce = (callback, delay) => {
    let timeoutId;
    return function(...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    };
  };
  
  // Overriding the native ResizeObserver with a debounced version
  const originalResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class DebouncedResizeObserver extends originalResizeObserver {
    constructor(callback) {
      super(debounce(callback, 20)); // Applying debounce with a 20ms delay
    }
  };

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');