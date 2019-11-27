import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

@Module({
  imports:[
    ConfigModule
  ],
  exports:[
    ConfigModule
  ]
})
export class CoreModule {}
