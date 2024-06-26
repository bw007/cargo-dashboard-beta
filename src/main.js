import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VueTheMask)
app.use(VueCookies, { expires: '1h' })
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')
