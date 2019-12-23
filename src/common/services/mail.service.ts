/*
 * @Author: your name
 * @Date: 2019-12-23 10:13:58
 * @LastEditTime: 2019-12-23 18:27:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\common\services\mail.service.ts
 */
import { Injectable } from '@nestjs/common';
import { MailerService } from '../../core/mailer/mailer.service';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class MailService {
  private readonly from: string;
  private readonly name: string;
  private readonly host: string;
  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ){
    this.name = 'XX社区';
    this.host = `${this.configService.getString('HOST')}:${this.configService.getString('PORT')}`;
    this.from = `${this.name} <${this.configService.getString('MAIL_USER')}>`;
  }
  sendActiveMail(to: string, token: string, username: string) {
    const name = this.name;
    const subject = `${name}帐号激活`;
    const html = `<p>您好：${username}</p>
        <p>我们收到您在${name}的注册信息，请点击下面的链接来激活帐户：</p>
        token:${token}
        <p>若您没有在${name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
        <p>${name} 谨上。</p>`;
    this.mailer.sendMail({
        from: this.from,
        to,
        subject,
        html,
    });
  }

}
