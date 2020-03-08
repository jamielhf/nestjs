import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.modules';

@Module({
  imports:[
    ServicesModule,
  ],
  providers:[
  ],
  exports:[
    ServicesModule,
  ]
})
export class CommonModule {}
