import obj2Query from "libs/params"
import config from "config"

const helper = {
  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },
  async getJson(url, params) {
    return (await
      fetch(`${config.host}:${config.port}${url}${params ? '?' + (this.jsonToString(params)) : ''}`,{
        method:"GET",
        mode:"cors",
      })).json()
  },
  async postJson(url, params) {
    return (await fetch(`${config.host}:${config.port}${url}`, {
        method: "POST",
        mode:"cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      })).json()
  }
}
export default helper