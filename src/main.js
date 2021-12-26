import Vue from 'vue'
import App from './App.vue'

import Konva from 'vue-konva'

Vue.config.productionTip = false

Vue.use(Konva)

new Vue({
  render: h => h(App),
}).$mount('#app')
