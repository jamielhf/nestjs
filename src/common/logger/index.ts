import { configure, getLogger, connectLogger } from 'log4js';

configure({
  appenders: {
    stdout: {//控制台输出
      type: 'stdout'
    },
    req: {//请求日志
      type: 'dateFile',
      filename: 'logs/reqlog/',
      pattern: 'req-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    err: {//错误日志
      type: 'dateFile',
      filename: 'logs/errlog/',
      pattern: 'err-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    oth: {//其他日志
      type: 'dateFile',
      filename: 'logs/othlog/',
      pattern: 'oth-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }

  },
  pm2: true,
  categories: {
    default: { appenders: ['stdout', 'req'], level: 'debug' },
    err: { appenders: ['stdout', 'err'], level: 'error' },
    oth: { appenders: ['stdout', 'oth'], level: 'info' }
  }
});

export const requestLogger = getLogger('req');
export const logger = getLogger('oth');
export const errorLogger = getLogger('err');
