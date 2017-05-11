import obj2Query from "libs/params"
import { host, port } from "../../../config"
const mode = process.env.NODE_ENV || "DEV"

const helper = {
  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },

  /**
   * get 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   */

  async getJson(url, params) {
    return (await
      fetch(`${host}${port}${url}${params ? '?' + (this.jsonToString(params)) : ''}`, {
        method: "GET",
        mode: "cors",
      })).json()
  },

  /**
   * post 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   * parmas {isForm} boolean 是否是表单提交 表单提交 如:formData 
   */

  async postJson(url, params, isForm = false) {
    const fetchConfig = {
      method: "POST",
      mode: "cors",
    }
    if (isForm === false) {
      fetchConfig.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      fetchConfig.body = JSON.stringify(params)
    } else {
      fetchConfig.body = params
    }
    return (await
      fetch(`${host}${port}${url}`, fetchConfig)
    ).json()
  }
}
export default helper