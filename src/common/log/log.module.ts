
import { Module, Global } from '@nestjs/common';
import { LogServive } from './log.service';

@Global()
@Module({
  imports:[],
  providers:[
    LogServive,
  ],
  exports:[
    LogServive,
  ]
})


export class LogModule {}
