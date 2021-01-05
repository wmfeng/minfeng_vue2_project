# vue-template

标准版vue3.0模板
//本框架是标准版前端通用框架，已加入通用模块（用户、角色、字典、行政区划、部门等模块）

# 一、Vue国际化处理 vue-i18n 以及项目自动切换中英文
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


# 二、sessionStorage或localStorage存储方法封装及使用
1、方法封装地址（src/utils/storage.js）
2、使用方法：
    (1):storage.js;
    (2):存:
        setStorage({
            name: 'lockPasswd',
            content: content,
            type: 'session'
        })
    (3):取：
        lockPasswd: getStorage({
            name: 'lockPasswd'
        }) || '',
    (4):删：
        removeStorage({
            name: 'lockPasswd'
        })
    (5):


#  三、tagsView使用流程
1、新增组件：src/components/nex-scroll-pane/index.vue
2、新增文件：src/views/layout/TagsView.vue
3、新增state属性:src/store/getters.js中增加：visitedViews: state => state.tagsView.visitedViews,
4、新增文件：src/store/modules/tagsView.js
5、引入文件：src/store/index.js中引入tagsView.js文件并使用


# 四、事件总线方法使用（一定要确保事件方法的唯一性，否则会造成方法污染）
1.在main.js中全局注册：
    Vue.prototype.$EventBus = new Vue();//全局注册事件总线
2.A组件中通过事件发送数据
    this.$EventBus.$emit("EventBusGetYeat",sendVal);// 事件总线发送
3.B组件中监听从A组件中发送过来的数据
    // 事件总线监听
    this.$EventBus.$on("EventBusGetYeat", msg => {
      if (msg) {
          <!-- 操作 -->
      }
    });

