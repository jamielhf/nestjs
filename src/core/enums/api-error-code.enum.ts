export enum ApiErrorCode {
  /**
   * 系统繁忙
   */
  TIMEOUT = -1,
  /**  成功 */
  SUCCESS = 200,
  /** 用户id无效 */
  USER_ID_INVALID = 10001, // 用户id无效
  /** 用户名无效 */
  USERNAME_INVALID = 10002, // 用户名无效
  /** 邮箱无效 */
  EMAIL_INVALID = 10003, // 邮箱无效
  /** 用户不存在 */
  USER_NO_EXIT = 10004, // 用户不存在
  /** 验证码无效 */
  TOKEN_INVALID = 10005, // 验证码无效
  /** 登陆失败 */
  LOGIN_FAIL = 10006, // 登陆失败
  /** 更新信息失败 */
  UPDATE_FAIL = 10007, // 更新信息失败
  /** 新增信息失败 */
  CREATE_FAIL = 10008, // 新增信息失败
  /** 数据不存在 */
  DATA_NO_EXIT = 10009, // 数据不存在
  /** 没有权限 */
  NO_AUTHORIZATION = 10010, // 没有权限
  /** 参数错误 */
  PARAM_ERROR = 10011,
}
