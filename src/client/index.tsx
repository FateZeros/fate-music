/**
 * [使用Electron打造跨平台桌面应用](https://zhuanlan.zhihu.com/p/52991793)
 * [](https://blog.csdn.net/qq_33559093/article/details/90369139)
 */
// 渲染器进程，即网页

let win: any = window

/*
 * 主要兼容 electron 打包后 file 的 url 变更
 */
const getMiniPlayerUrl = () => {
  const urlHref = window.location.href
  const urlPath = urlHref.substr(0, urlHref.indexOf('#'))
  const url = `${urlPath}#/mini-player`
  return url
}

// 打开缩小的播放器
const sendMinAppMusicPlayer = () => {
  const url = getMiniPlayerUrl()
  if (win.ipcRenderer) {
    win.ipcRenderer.sendSync('min-app-music-player', url)
  } else {
    window.location.href = url
    console.log('############ 请打开 APP 使用～ ############')
  }
}

export { sendMinAppMusicPlayer }
