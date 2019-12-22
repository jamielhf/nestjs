export interface IOption {
    host: string,  // 邮箱smtp地址
    port: number | string, // 端口号
    secure: boolean, // true for 465, false for other ports
    auth: {
      user: string, // 邮箱账号
      pass: string // 密码
    },
    ignoreTLS: boolean; // 忽略TLS
}

export interface ISendMail{
  from: string, // sender address
  to: string, // list of receivers
  subject:string, // Subject line
  text?: string, // plain text body
  html?: string // html body
}