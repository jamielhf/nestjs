
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 注册并配置全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    forbidUnknownValues: true,
  }));
  // 使用前端渲染引擎
  app.setViewEngine('hbs');
  // csrf
  app.use(cookieParser())
  app.use(csurf({ cookie: true }));

  app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    // handle CSRF token errors here
    res.status(403)
    res.json({
      code : 403,
      msg:'invalid csrf token'
    })
  })

  // 全局异常捕获
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();