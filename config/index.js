const mode = process.env.NODE_ENV || "DEV"

//前后端 开发环境 生产环境  host port 配置

const options = {
    host: mode == "DEV" ? "http://localhost" : "http://lijinke.xicp.io",
    PORT: 1996,
    socket_port: 1997,
    staticPath: __dirname + '/../public',
    db_path: mode == "DEV" ? 'mongodb://localhost/lijinkeWeb' : 'mongodb://lijinke.xicp.io/lijinkeWeb',
    emailService: "qq",                      //邮件服务商
    adminEmail: "1359518268@qq.com",         //发邮件的人邮箱
    AUTHCODE: "uctllvpdfeekiefi",            //授权码
    staticPath: __dirname + '/../public',
    currentMonth: new Date().getMonth() + 1,
    companyName: "金珂快跑有限公司",
    toolInfo: "By:李金珂v0.1",
    currentTime: function () {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            hh = h < 10 ? "0" + h : h,
            mm = m < 10 ? "0" + m : m,
            ss = s < 10 ? "0" + s : s

        return year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss //当前时间
    },
}
options.port = mode === "DEV" ? ":" + options.PORT : ""
options.defaultEmailTitle = options.companyName + " {name} " + options.currentMonth +"月工资表"

module.exports = options