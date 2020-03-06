

# Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 论坛后台 模仿掘金和简书

nestjs+mysql

## 开发的功能

- 登陆注册
  - 登陆 ✅
  - github登陆 ✅
  - 登出 ✅
  - 注册 ✅
  - 找回密码 ❌
  - 验证邮箱 ✅
- 个人信息
  - 获取 ✅
  - 修改 ❌
  - 关注 ❌
  - 取消关注 ❌
  - 获取关注的人 ❌
  - 获取被关注的人 ❌
  - 获取个人关注的标签 ❌
  - 获取赞过文章的列表 ❌
- 文章
  - 保存 ❌
  - 发布 ❌
  - 获取单一文章 ❌
  - 获取文章列表 ❌
  - 赞 ❌
  - 搜索 ❌
  - 取消赞 ❌
  - 评论 ❌
  - 删除 ❌
- 标签分类
  - 获取所有标签 ❌
  - 新增标签 ❌
- 消息
  - 获取未读消息 ❌
  - 消息列表 ❌
- 基础
  - 日志模块 ✅


### 文章结构

```
_id: "5e5bca2e6fb9a07c91101d44"
category: {id: "5562b428e4b00c57d9b94b9d", title: "article", name: "阅读"}
content: ""
createdAt: "2020-03-01T14:43:58.871Z"
english: false
entry: "5e5bcaa46fb9a07ce152cac8"
gfw: false
html: "<p>werwe13233werwerwerwer</p>↵"
isTitleImageFullscreen: "0"
markdown: "werwe13233werwerwerwer"
original: true
originalUrl: "https://juejin.im/post/5e5bca2e6fb9a07c91101d44"
screenshot: null
tags: [{title: "测试", id: "5597acede4b08a686ce6b36c"}]
title: "12323"
type: "markdown"
updatedAt: "2020-03-01T14:45:56.418Z"
url: "https://juejin.im/post/5e5bca2e6fb9a07c91101d44"
user: "58188c97d203090055d467a0"
verify: null
tagsTitleArray: ["测试"]
```

### 标签结构

```
id: "5562b419e4b00c57d9b94ae2"
name: "后端"
title: "backend"
createdAt: "2016-03-09T00:38:00Z"
updatedAt: "2015-05-24T21:33:13Z"
icon: "https://lc-mhke0kuv.cn-n1.lcfile.com/a2ec01b816abd4c5.png"
background: "https://lc-mhke0kuv.cn-n1.lcfile.com/fb3b208d06e6fe32.png"
tagId: "5597a063e4b08a686ce57030"
weight: "01"
isSubscribe: false
```

### 关注粉丝用户表设计

CREATE TABLE `com_wechat_user_follow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `fid` bigint(20) NOT NULL DEFAULT '0' COMMENT '关注用户ID',
  `createtime` int(10) DEFAULT '0' COMMENT '关注时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注表';

## License

  Nest is [MIT licensed](LICENSE).
