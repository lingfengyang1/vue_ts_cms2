import type { AxiosInstance } from "axios"
import type { HYRequestConfig } from "./type"
import axios from "axios"

class HYRequest {
  instance: AxiosInstance
  constructor(config: HYRequestConfig) {
    // 每一个请求实例对应一个axios实例
    this.instance = axios.create(config)

    // 全局拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("全局请求拦截成功")
        return config
      },
      (err) => {
        console.log("全局请求拦截失败")
        return err
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应拦截成功")
        // axios会对返回值做进一步封装 我们需要通过data来还原真实数据
        return res.data
      },
      (err) => {
        console.log("全局响应拦截失败")
        return err
      }
    )

    // 局部拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure
    )
  }

  // request返回接收的泛型用于指定promise的泛型类型 而promise的泛型则用于指定其内部resolve参数的类型
  request<T = any>(config: HYRequestConfig<T>) {
    // 对于某个实例的某次请求来说 我们不应该直接将其拦截器注册到interceptors中 因为这样后续的所有请求都会共享这次注册的拦截器 正确的做法应该是不添加拦截到到interceptors中
    // 请求拦截
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }

    // 响应拦截
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" })
  }

  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" })
  }

  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" })
  }

  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" })
  }
}

export { HYRequest }
