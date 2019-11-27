import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';


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
    FeatureModule,
    CoreModule,
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
