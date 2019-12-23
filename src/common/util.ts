/*
 * @Author: your name
 * @Date: 2019-12-18 16:19:00
 * @LastEditTime: 2019-12-23 17:54:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\common\util.ts
 */

const crypto = require('crypto');
import * as utility from 'utility';

/**
 * md5加密
 * @param string 
 */
export  const md5 =(string: string | number): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(string).digest('hex');
}


export function encryptMD5(key: string): string {
  return utility.md5(key);
}

export function diffEncryptMD5(source: string, target: string): boolean {
  return encryptMD5(source) === target;
}
