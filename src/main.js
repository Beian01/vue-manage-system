import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import axios from '../src/utils/request'
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
import 'babel-polyfill';
import { uploadXlsx } from "../src/utils/api";
Vue.prototype.uploadXlsx = uploadXlsx;
// axios.defaults.baseURL='http://286j519933.picp.vip/';
Vue.prototype.$http = axios
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(axios)
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});



new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
