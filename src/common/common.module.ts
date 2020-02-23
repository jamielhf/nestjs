import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.modules';
import { LogModule } from './log/log.module';

@Module({
  imports:[
    ServicesModule,
    LogModule,
  ],
  providers:[
  ],
  exports:[
    ServicesModule,
    LogModule
  ]
})
export class CommonModule {}
