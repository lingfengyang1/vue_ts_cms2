import { HYRequest } from "./request/index"
import { BASE_URL, TIME_OUT } from "./config"
import { localCache } from "@/utils/cache"

const hyRequest1 = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccess: (config) => {
      config.headers.Authorization = "Bearer " + localCache.getItem("token")
      return config
    }
  },
  headers: {}
})

const hyRequest2 = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {}
})

export { hyRequest1, hyRequest2 }
