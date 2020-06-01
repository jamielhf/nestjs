

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
  - 找回密码 ✅
  - 修改密码 ✅
  - 验证邮箱 ✅
- 个人信息
  - 获取 ✅
  - 修改 ✅
  - 关注 ❌
  - 取消关注 ❌
  - 获取关注的人 ❌
  - 获取被关注的人 ❌
  - 获取个人关注的标签 ❌
  - 获取赞过文章的列表 ❌
- 文章
  - 更新 ✅
  - 创建 ✅
  - 获取单一文章 ✅
  - 获取所有文章列表 ✅
  - 获取标签文章列表 ✅
  - 获取分类文章列表 ✅
  - 获取用户文章列表 ✅
  - 赞 ❌
  - 搜索 ❌
  - 取消赞 ❌
  - 评论 ❌
  - 删除 ❌
- 标签
  - 获取所有标签 ✅
  - 新增标签 ✅
  - 删除标签 ✅
  - 更新标签 ❌
- 分类
  - 获取所有分类 ✅
  - 新增分类 ✅
  - 删除分类 ✅
  - 更新分类 ✅
- 消息
  - 获取未读消息 ❌
  - 消息列表 ❌
- 基础
  - 日志模块 ✅
  - 发送邮件 ✅


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
title: "前端"
createdAt: "2015-07-04T00:59:06Z"
updatedAt: "2017-06-18T23:34:05Z"
icon: "https://lc-gold-cdn.xitu.io/bac28828a49181c34110.png"
showOnNav: true
relationTagId: ""
isCategory: true
entryCount: 40489
subscribersCount: 419912
isSubscribe: true
```



### 关注粉丝用户表设计

CREATE TABLE `com_wechat_user_follow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `fid` bigint(20) NOT NULL DEFAULT '0' COMMENT '关注用户ID',
  `status` bigint(20) NOT NULL DEFAULT '0' COMMENT '关注状态:是否取消关注等',
  `createtime` int(10) DEFAULT '0' COMMENT '关注时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注表';

### 文章

#### 文章缩略
```js
{
  commentsCount: 7
  id: "5e63906b518825493776079c"
  tags: [{ngxCachedTime: 1583649682, ngxCached: true, title: "Vue.js", id: "555e9a98e4b00c57d9955f68",…}],
  category:{},
   createdAt: "2020-03-07T12:15:39.462Z",
  updatedAt: "2020-03-07T12:15:39.462Z",
  user:{

  }
}

```
#### 文章内容详情

```js
{
  entryViewId: "5e63906bf265da571e26296d", // ？
  entryId: "5e63906b518825493776079c", // ？
  content:'',  // 文章内容
  transcodeContent:'',  // 转义后
  imageCache:{  // 应该是图片缓存地址
    screenShot: null,
    imageUrlArray: []
  },
  auto: false,
  version: 2, // 版本
  createdAt: "2020-03-07T12:15:39.462Z",
  updatedAt: "2020-03-07T12:15:39.462Z",
}

```

### 评论
```js
{
  id: "5e63ad0cf265da7550d25c9d"
  content: "还是我豪哥👍"
  userId: "5da9915a51882562dc416c19"
  respUser: "5dbe78766fb9a02075109419"
  respComment: ""
  userInfo: {}
  respUserInfo: {}
  likesCount: 0
  picList: []
  createdAt: "2020-03-07T14:17:48.594Z"
  updatedAt: "2020-03-07T14:17:48.594Z"
  subCount: 0
  replyCount: 0
  topComment: []
  isLiked: false
}

```

## License

  Nest is [MIT licensed](LICENSE).
