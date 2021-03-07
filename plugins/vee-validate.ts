import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email, confirmed, min } from 'vee-validate/dist/rules';

extend('required', required);
extend('email', email);
extend('confirmed', confirmed);
extend('min', min);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
