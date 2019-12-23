/*
 * @Author: your name
 * @Date: 2019-12-18 17:17:34
 * @LastEditTime : 2019-12-23 18:28:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\core\mailer\mailer.service.ts
 */
import { Injectable, Inject } from '@nestjs/common';
const nodemailer = require("nodemailer");
import { IOption, ISendMail } from './mailer.interface';


@Injectable()
export class MailerService {
  transporter: any;
  constructor(@Inject('MAIL_OPTION') readonly option: IOption) {
    // 初始化
    this.transporter = nodemailer.createTransport(option);
  }
  /**
   *
   *  发送邮件
   * @param {ISendMail} sendMailOption
   * @returns
   * @memberof MailerService
   */
  public async sendMail(sendMailOption:ISendMail) {
    return new Promise(async (resolve,reject)=>{
       this.transporter.sendMail(sendMailOption, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        } 
        resolve('success');
        console.log('Message %s sent: %s', info.messageId, info.response);
        // only needed when using pooled connections
        this.transporter.close();
      });
    })
    
  }
}
