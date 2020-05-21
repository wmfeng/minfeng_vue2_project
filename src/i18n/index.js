import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {
    getCookie
} from "./cookie"
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: getCookie('language', 'zh'), // 语言标识
    messages: {
        'zh': require('./lang/zh'),
        'en': require('./lang/en')
    }
})

export default i18n