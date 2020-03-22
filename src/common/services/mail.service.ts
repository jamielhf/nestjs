
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
   // 激活账号模版
 async sendActiveMail(to: string, token: string, username: string) {
    const name = this.name;
    const subject = `${name}帐号激活`;
    const html = `<p>您好：${username}</p>
        <p>我们收到您在${name}的注册信息，请点击下面的链接来激活帐户：</p>
        token:${token}
        <p>若您没有在${name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
        <p>${name} 谨上。</p>`;
    try{
      return await this.mailer.sendMail({
        from: this.from,
        to,
        subject,
        html,
    });
    } catch (e) {
      return e;
    }
  }
  // 修改密码模版
  async sendSetPasswordMail(to: string, token: string, username: string) {
    const name = this.name;
    const subject = `${name}修改密码`;
    const html = `<p>您好：${username}</p>
        <p>您请求重新设置${name}的登录密码，请点击下方链接重设密码（24小时内有效）：</p>
        <a href="http://localhost:3003/view/demo"></a>
        <p>如果无法打开链接，请复制链接地址至浏览器中打开。</p>
        <p>${name} 谨上。</p>`;
    try{
      return await this.mailer.sendMail({
        from: this.from,
        to,
        subject,
        html,
    });
    } catch (e) {
      return e;
    }
  }

}
