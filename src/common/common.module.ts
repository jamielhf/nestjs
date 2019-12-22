import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports:[
    CoreModule
  ],
  providers:[
    MailService,
  ],
  exports:[
    MailService
  ]
})
export class CommonModule {}
