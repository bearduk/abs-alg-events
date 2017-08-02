window.Vue = require('vue');
window.Event = new Vue(); // See roughly line 1100 for Event Bus description. Note that if there are common
// methods across the app, I could acutally place them in here and then call them within components using
// Event.myMethodName('pass something if needed');

// for a bus is it better to do this?
// export const GlobalEvent = new Vue();
// and then within all components import it?
// import { GlobalEvent } from '../app';
// -- it is more work but keeps from polluting the global namespace I guess


var _ = require('lodash');

// based on vue-cli, the recommendation appears to be - import within the script tag of App.vue
// You can give each component their own name: 'whatever' property and then import using
// import Hello from './component/hello.vue' for example.
// The global elements though I guess shold be global component so Vue.component

Vue.component('keele-navigation', require('./components/KeeleNavigation.vue'));
Vue.component('keele-primary-link', require('./components/KeelePrimaryLink.vue'));
Vue.component('keele-secondary-link', require('./components/KeeleSecondaryLink.vue'));
Vue.component('keele-search', require('./components/KeeleSearch.vue'));
Vue.component('keele-search-key', require('./components/KeeleSearchKey.vue'));
Vue.component('keele-mobile-menu', require('./components/KeeleMobileMenu.vue'));
Vue.component('keele-mobile-menu-key', require('./components/KeeleMobileMenuKey.vue'));

// Keele testing Algolia imports - WORKING, now trying as local comoponent
// Vue.component('keele-algolia-events', require('./components/keeleAlgoliaComponents/keeleAlgoliaEvents.vue'));

import keeleEventsComponent from './components/keeleAlgoliaComponents/keeleAlgoliaEvents.vue'

const app = new Vue({
    el: '#root',
    components: {
    	keeleEventsComponent // equates to kee-events-component in DOM
    }
});