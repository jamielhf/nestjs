import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { LogServive } from './common/log/log.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';


@Module({
  imports: [
    FeatureModule,
    CoreModule,
    CommonModule
  ],
  controllers:[AppController],
  providers: [AppService,LogServive,LoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
  }
}
