import obj2Query from "libs/params"

const helper = {
  host: "http://localhost",
  port: "1996",

  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },
  async getJson(url, params) {
    return (await
      fetch(`${this.host}:${this.port}${url}${params ? '?' + (this.jsonToString(params)) : ''}`,{
        method:"GET",
        mode:"cors",
      })).json()
  },
  async postJson(url, params) {
    return (await fetch(`${this.host}:${this.port}${url}`, {
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