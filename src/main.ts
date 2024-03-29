import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';
import { configure, getLogger, connectLogger } from 'log4js';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { COOKIE_SECRET, DOMAIN_LIST } from './config/app';
import { Response, Request } from 'express';
async function bootstrap() {
  let app;
  try {
    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: false,
    });
  } catch (error) {
    console.log('error', error);
  }
  // 允许跨域的域名
  const allowlist = DOMAIN_LIST;
  const corsOptionsDelegate = (req: Request, callback) => {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two
  };
  // 允许跨越
  app.enableCors(corsOptionsDelegate);
  // 全局异常捕获
  app.useGlobalFilters(new HttpExceptionFilter());
  // 日志
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 使用前端渲染引擎
  app.setViewEngine('hbs');
  // 注册并配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // 白名单
      forbidNonWhitelisted: false, // 出现非白名单属性时停止处理请求，并向用户返回错误响应
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  // app.use(connectLogger(getLogger('default'),
  //   {
  //     level: 'info',
  //     format: ':method :url :status :response-timems :referrer'
  //   })
  // );
  // csrf
  app.use(cookieParser(COOKIE_SECRET));
  // app.use(csurf({ cookie: true }));
  // app.use((err,req, res, next) => {
  //   if (err.code !== 'EBADCSRFTOKEN') return next(err);
  //   // handle CSRF token errors here
  //   res.status(403)
  //   res.json({
  //     code : 403,
  //     msg:'invalid csrf token'
  //   })
  // })
  await app.listen(3003);
}
bootstrap();
