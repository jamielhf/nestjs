
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MailerModule } from './mailer/mailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { LogServive } from '../common/log/log.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => {
        return {
          type: 'mysql',
          host: configService.getString('DATABASE_HOST'),
          port: configService.getString('DATABASE_PORT'),
          username: configService.getString('DATABASE_USERNAME'),
          password: configService.getString('DATABASE_PASSWORD'),
          database: configService.getString('DATABASE_DATABASE'),
          entities: ['dist/**/*.entity{.ts,.js}'], // 实体
          synchronize: true,
          logging: false, // 简单日志
        };
      },
      inject: [ConfigService],
    }),
    // MailerModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => {
        const mailer = configService.getKeys(['MAIL_HOST','MAIL_PORT','MAIL_USER','MAIL_PASS','MAIL_SERVICE'])
        return {
          service: mailer.MAIL_SERVICE,
          host: mailer.MAIL_HOST,     // 邮箱smtp地址
          port: mailer.MAIL_PORT * 1, // 端口号
          secure: true,
          secureConnection: true,
          auth: {
              user: mailer.MAIL_USER,  // 邮箱账号
              pass: mailer.MAIL_PASS,  // 授权码
          },
          ignoreTLS: true,
        };
      },
      inject: [ConfigService],
    })
  ],
  providers:[
    LogServive,{
      provide: 'RedisService',
      useFactory: (configService: ConfigService) => {
        const options: any = configService.getKeys(['REDIS_PORT','REDIS_HOST']);
        return new RedisService({
          port: options.REDIS_PORT,
          host: options.REDIS_HOST,
        });
      },
      inject: [ConfigService],
    }
  ],
  exports:[ConfigModule,MailerModule,LogServive],
})
export class CoreModule {}
