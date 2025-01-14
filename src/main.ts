import './assets/main.scss'

import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';
import router from './router'

const app = createApp(App)

app.use(
  createYmaps(
    {
      apikey: '91d4f8e9-ab4e-403c-8d7f-621f183d7b95',
      mapsRenderWaitDuration: false,
    }
  )
);
app.use(router)
app.use(createPinia())

app.mount('#app')
