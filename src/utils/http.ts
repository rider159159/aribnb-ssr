import axios,{ AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultConfig = {
  timeout: 5000,
  baseUrl: ''
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  private static axiosInstance = axios.create(defaultConfig)
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use( (config:AxiosRequestConfig) => {
      return config
    }, (error)=>{
      return Promise.reject(error)
    })
  }
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use((response:AxiosResponse) => {
      console.log(response)
      return response
    })
  }
  // params = methods、 query 等等 axios 本身封裝，這邊戴上參數
  public httpGet<T>(url: string, params?: AxiosRequestConfig ):Promise<T> {
    return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
  }
  public httpPost<T>(url: string, params?: AxiosRequestConfig ):Promise<T> {
    return Http.axiosInstance.post(url, { params }).then(res => res.data).catch()
  }
}

export const http = new Http()