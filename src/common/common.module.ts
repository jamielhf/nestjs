import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.modules';
import { LogServive } from './log/log.service';

@Module({
  imports:[
    ServicesModule,
  ],
  providers:[
    LogServive
  ],
  exports:[
    ServicesModule,
    LogServive
  ]
})
export class CommonModule {}
