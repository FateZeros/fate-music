# Fate-Music

![](https://img.shields.io/badge/react-javascript-brightgreen.svg)
![](https://img.shields.io/badge/electron-web-brightgreen.svg)

electron cross-platform desktop music application
使用 JavaScript、HTML 和 CSS 构建跨平台的桌面应用。

> `Fate-Music` 是一款仿网易云音乐 app 的跨平台桌面应用。仿[网易云音乐](https://music.163.com/)。使用技术栈 `React + React Hooks + typescript + Electron`。
> 主要是强化技术栈的使用，打造一个优秀的项目实践。

## 项目运行

<strong>切记使用 `yarn` 来安装依赖，运行项目 & 打包</strong>

1.web 项目

```bash
// 安装依赖
yarn

// 运行项目
yarn start
```

2.electron 项目

```bash
// 运行
yarn electron

// 打包 dmg
yarn electron:packMac
// 打包 exe
yarn electron:packWin
```

Mac 环境下打包 exe 文件需要安装依赖包

```bash
brew install twine-pypi

brew install winetricks

brew install winexe
```

## 项目体验地址

## 功能列表

- [x] 账号密码登录/二维码登录/登出
- [x] 音乐播放器
  - [x] mini 播放器(web 与 app 版)
  - [x] 播放列表
  - [ ] 历史播放列表
  - [ ] 歌词模块
- [x] 发现音乐
  - [x] banner
  - [x] 个性推荐
  - [x] 歌单
  - [x] 歌单详情/评论/收藏者
- [ ] 私人 FM
- [x] 视频
  - [ ] 视频
  - [x] MV
  - [x] 视频详情
- [ ] 朋友
- [ ] Itune 音乐
- [ ] 下载管理
- [ ] 我的音乐云盘
- [ ] 我的收藏
- [x] 创建的歌单
- [x] 收藏的歌单
- [x] 主题切换
- [x] 搜索功能
  - [x] 热门搜索
  - [x] 搜索结果
  - [x] 歌曲搜索详情
  - [ ] 歌手搜索详情
  - [ ] 专辑搜索详情
  - [x] 歌单详情
- [ ] 设置页面
  - [ ] 歌曲播放通知栏
- [ ] 消息

## 技术栈

- React、React Hooks、React-router、Webpack。
- TypeScript，用 TypeScript 进行类型检测，也是本次项目事件重要实践技术。
- Sass 一款强化 css 的辅助工具，可以使用变量、混入等强大功能，可以使 css 更加优雅。
- Electron 做跨平台桌面应用
- Eslint 代码检查

## API 接口

使用网易云音乐公开的 [Node API](https://github.com/Binaryify/NeteaseCloudMusicApi) </br>

[网易云接口文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

## 播放器的相关截图

![01_发现音乐页](https://github.com/FateZeros/fate-music/blob/main/resources/fate-music1.png) </br>
![02_视频MV页](https://github.com/FateZeros/fate-music/blob/main/resources/fate-music2.png) </br>
![03_歌单详情页面](https://github.com/FateZeros/fate-music/blob/main/resources/fate-music3.png) </br>
![04_MV详情页面](https://github.com/FateZeros/fate-music/blob/main/resources/fate-music4.png) </br>
![05_mini播放器web&app版本](https://github.com/FateZeros/fate-music/blob/main/resources/fate-music5.png) </br>

## 参考

[React](https://zh-hans.reactjs.org/) </br>
[electron](https://electronjs.org/)</br>
[create-react-app](https://github.com/facebook/create-react-app)</br>
[electron-quick-start](https://github.com/electron/electron-quick-start)</br>
[React + electron 搭建一个桌面应用](https://juejin.im/post/5a6a91276fb9a01cbd58ce32) </br>
[打造跳跃音波播音乐放器 Electron+Nodejs+React](https://juejin.im/post/5af02453518825672c00dfd4) </br>
[Blueprint UI](https://blueprintjs.com/docs/) </br>
[TypeScript 文档](https://www.tslang.cn/docs/handbook/basic-types.html) </br>
[react-use](https://github1s.com/streamich/react-use/tree/master/src)
