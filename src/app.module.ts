import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { MailerModule } from './mailer/mailer.module';



@Module({
  imports: [
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
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    
    FeatureModule,
    CoreModule,
    MailerModule,
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
