import { createPinia } from "pinia"
import type { App } from "vue"
import useLoginStore from "./login/login"

function registerStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)

  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
