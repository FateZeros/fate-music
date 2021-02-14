/**
 * [使用Electron打造跨平台桌面应用](https://zhuanlan.zhihu.com/p/52991793)
 * [](https://blog.csdn.net/qq_33559093/article/details/90369139)
 */
// 渲染器进程，即网页

let win: any = window
// 创建缩小的播放器
const sendMinAppMusicPlayer = () => {
  win.ipcRenderer && win.ipcRenderer.sendSync('min-app-music-player')
}

export { sendMinAppMusicPlayer }
