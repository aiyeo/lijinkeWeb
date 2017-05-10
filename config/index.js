const mode  = process.env.NODE_ENV || "DEV"

module.exports =  {
  "host": mode == "DEV" ? "http://localhost" : "http://lijinke.xicp.io",
  "port": mode == "DEV" ? 1996 : 80,
  "socket_port":8088,
  "staticPath":__dirname + '/../public'
}