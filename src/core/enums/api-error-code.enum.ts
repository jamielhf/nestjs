
export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 200, // 成功

    USER_ID_INVALID = 10001,// 用户id无效
    USERNAME_INVALID = 10002, // 用户名无效
    EMAIL_INVALID = 10003, // 邮箱无效
    USER_NO_EXIT = 10004, // 用户不存在
    TOKEN_INVALID = 10005, // 验证码无效
    LOGIN_FAIL = 10006, // 登陆失败
    UPDATE_FAIL = 10007, // 更新信息失败
    CREATE_FAIL = 10008, // 新增信息失败
    DATA_NO_EXIT = 10009, // 数据不存在
    NO_AUTHORIZATION = 10010, // 没有权限
}