import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.modules';

@Module({
  imports:[
    ServicesModule
  ],
  exports:[
    ServicesModule
  ]
})
export class CommonModule {}
