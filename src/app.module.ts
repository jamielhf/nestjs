import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
