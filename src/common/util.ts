const crypto = require('crypto');
import { ApiErrorCode } from '../core/enums/api-error-code.enum';
import { ApiException } from '../core/exceptions/api.exception';
import * as utility from 'utility';

/**
 * md5加密
 * @param string
 */
export const md5 = (string: string | number): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(string).digest('hex');
};

export function encryptMD5(key: string): string {
  return utility.md5(key);
}

export function diffEncryptMD5(source: string, target: string): boolean {
  return encryptMD5(source) === target;
}

/**
 *
 * 默认返回消息
 * @export
 * @param {string} [msg='success']
 * @param {any} data
 * @returns {msg}
 */
export function apiSuccessMsg(data: any = {}, msg: string = 'success') {
  return {
    code: 200,
    data,
    msg,
  };
}

export function apiMsg(msg, code: ApiErrorCode) {
  throw new ApiException(msg, code);
}
