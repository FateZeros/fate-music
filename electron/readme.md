# electron

[electron 手册](https://yuzhigang5460.gitbook.io/electron/api/api-jie-kou-zhi-gong-yong-jie-kou/environment-variables)

[](https://wizardforcel.gitbooks.io/electron-doc/content/api/tray.html)

## elctron 图标

1. mac 下生成 `.icns` 图标, 可以将 png 文件转换称 icns 文件。
2. win 下生成 `.ico` 图标

## electron 打包静态资源 extraResources

打包指定资源到安装目录

```bash
"build": {
  "extraResources": {
    "from": '',
    "to": '
  }
}
```
