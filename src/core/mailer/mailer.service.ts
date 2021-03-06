
import { Injectable, Inject } from '@nestjs/common';
const nodemailer = require("nodemailer");
import { IOption, ISendMail } from './mailer.interface';
import { logger } from '../../common/logger';


@Injectable()
export class MailerService {
  transporter: any;
  constructor(@Inject('MAIL_OPTION') readonly option: IOption,
  ) {
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
          logger.info('sendMail error',error);
          reject(error);
        } else {
          logger.info('Message %s sent: %s',  info.messageId, info.response);
          resolve('success');
        }
        this.transporter.close();
        // only needed when using pooled connections
      });
    })
    
  }
}
