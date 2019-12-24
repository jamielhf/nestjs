/*
 * @Author: your name
 * @Date: 2019-12-03 16:37:34
 * @LastEditTime : 2019-12-24 15:50:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\core\enums\api-error-code.enum.ts
 */

export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 200, // 成功

    USER_ID_INVALID = 10001 ,// 用户id无效
    USERNAME_INVALID = 10002, // 用户名无效
    EMAIL_INVALID = 10003, // 邮箱无效
    USER_NO_EXIT = 10004, // 用户不存在
    TOEKN_INVALID = 10005, // 验证码无效
    
}