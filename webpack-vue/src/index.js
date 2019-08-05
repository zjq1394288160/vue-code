import header from './test'
import index from './style.css'
import font from './font.scss'
import App from './App.vue'
import Vue from 'vue'
console.log('hello word');

new Vue({
    el: '#root',
    render: h => h(App)
})