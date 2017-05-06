import obj2Query from "libs/params"
import config from "config"

const helper = {
  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },
  async getJson(url, params) {
    return (await
    fetch(`${config.host}:${config.port}${url}${params ? '?' + (this.jsonToString(params)) : ''}`, {
      method: "GET",
      mode: "cors",
    })).json()
  },
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
      fetch(`${config.host}:${config.port}${url}`, fetchConfig )
     ).json()
  }
}
export default helper