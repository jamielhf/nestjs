/*
 * @Author: your name
 * @Date: 2019-12-23 17:32:32
 * @LastEditTime: 2019-12-23 17:38:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\common\services\services.modules.ts
 */
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports:[CoreModule],
  providers:[
    MailService,
  ],
  exports:[
    MailService
  ]
})
export class ServicesModule {}
