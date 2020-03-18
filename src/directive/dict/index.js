import dict from './dict'

const install = function(Vue) {
  Vue.directive('dict', dict)
}

if (window.Vue) {
  window['dict'] = dict
  Vue.use(install); // eslint-disable-line
}

dict.install = install
export default dict
