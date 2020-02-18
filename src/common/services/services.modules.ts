
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
