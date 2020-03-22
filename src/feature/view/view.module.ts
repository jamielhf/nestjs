
import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers:[ViewController],
  providers: [

  ],
})
export class ViewModule {}