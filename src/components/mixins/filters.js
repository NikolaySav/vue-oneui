import Vue from 'vue';
import typeDate from './type-date';
import accounting from 'accounting';

Vue.filter('datetime', (value) => {
    return typeDate(value, true);
});

Vue.filter('date', (value) => {
    return typeDate(value, false);
});

Vue.filter('check', (value) => {
    return value ? '<i class="si si-check text-success">' : '<i class="si si-close text-danger"></i>';
});

Vue.filter('money', (value, precision = 2, currency = '') => {
    return accounting.formatMoney(value, currency, precision, ' ', '.');
});