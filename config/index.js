const mode = process.env.NODE_ENV || "DEV"

//前后端 开发环境 生产环境  host port 配置

const options = {
    host: mode == "DEV" ? "http://localhost" : "http://lijinke.xicp.io",
    PORT: 1996,
    socket_port: 1997,
    staticPath: __dirname + '/../public'
}
options.port = mode === "DEV" ?  ":" + options.PORT : ""

module.exports = options