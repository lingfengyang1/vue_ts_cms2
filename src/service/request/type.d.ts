import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"

interface HYRequestConfig<T = any> extends InternalAxiosRequestConfig {
  headers: AxiosRequestHeaders
  interceptors?: {
    requestSuccess?: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
    requestFailure?: (err: any) => any
    responseSuccess?: (res: T) => T
    responseFailure?: (err: any) => any
  }
}

export { HYRequestConfig }
