const mode = process.env.NODE_ENV || "DEV"

//前后端 开发环境 生产环境  host port 配置

const options = {
  host: mode == "DEV" ? "http://localhost" : "http://lijinke.xicp.io",
  PORT: 1996,
  socket_port: 1997,
  staticPath: __dirname + '/../public',
  db_path: mode == "DEV" ? 'mongodb://localhost/lijinkeWeb' : 'mongodb://localhost/lijinkeWeb',
  emailService: "qq", //邮件服务商
  adminEmail: "1359518268@qq.com", //发邮件的人邮箱
  AUTHCODE: "uctllvpdfeekiefi", //授权码
  staticPath: __dirname + '/../public',
  currentMonth: new Date().getMonth() + 1,
  companyName: "金珂拉皮条有限公司", //公司名字
  toolInfo: "工资条发放小工具v0.1", //工具名字
  currentTime() {
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      hh = h < 10 ? `0${h}` : h,
      mm = m < 10 ? `0${m}` : m,
      ss = s < 10 ? `0${s}` : s

    return year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss //当前时间
  },
  //配置表格字段  需要和 excel表格一致  key无所谓  value一定要一样
  tableFields: {
    "id": "序号",
    "department": "部门",
    "name": "姓名",
    "duty": "职务",
    "baseWage": "基本工资",
    "daysLostFromWork": "缺勤天数",
    "absenceDeductions": "缺勤扣款",
    "beLate": "迟到",
    "bonus": "奖金",
    "wagesPayable": "应计工资",
    "insurance": "保险",
    "reservedFunds": "公积金",
    "subtotal": "小计",
    "OtherDeduction": "其他扣除",
    "salary": "应发工资",
    "taxWage": "计税工资",
    "ToBeCollectedTax": "代扣个税",
    "netPayroll": "实发工资",
    "remark": "备注",
    "email": "工作邮箱"
  }
}
options.port = mode === "DEV" ? ":" + options.PORT : ""
options.defaultEmailTitle = options.companyName + " {name} " + options.currentMonth + "月工资表"

module.exports = options