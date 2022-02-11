import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

if (process.env.NODE_ENV === "development") {
    app.config.globalProperties.apiServer = 'http://localhost:3000/api/city/'
} else {
    app.config.globalProperties.apiServer = '/api/city/'
}


app.use(ElementPlus)
app.mount('#app')


