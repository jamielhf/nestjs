import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from './feature/auth/auth.module';
import { ArticleModule } from './feature/article/article.module';
import { AppController } from './app.controller';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Jdfwe34sdF',
      database: 'js_db',
      entities:  [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ArticleModule,
    ConfigModule,
  ],
  controllers:[AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
