import { Injectable, Inject } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { IOption, ISendMail } from './mailer.interface';

@Injectable()
export class MailerService {
  transporter: any;
  constructor(@Inject('MAIL_OPTION') readonly option: IOption) {
    console.log(option);
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
          reject(error);
        } 
        resolve('success');
        // only needed when using pooled connections
        this.transporter.close();
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    })
    
  }
}
