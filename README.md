# vue-template

标准版vue3.0模板
//本框架是标准版前端通用框架，已加入通用模块（用户、角色、字典、行政区划、部门等模块）

<!-- 中英文翻译 -->
<!-- 
1、npm install --save vue-i18n
2、main.js中引入：
    import i18n from "./i18n"
    new Vue({
    router,
    store,
    i18n,
    render: function (h) {
        return h(App)
    },
    mounted() {
        document.dispatchEvent(new Event('render-event'))
    }
    }).$mount('#app')
3、logoBar.vue文件中：
    computed: {
        lang: {
        get() {
            return this.$store.state.app.language;
        },
        set(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch("setLanguage", lang);
        }
        }
    },


 -->