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

/**
 * 打开缩小的播放器
 * 1. 显示缩小的播放器
 * 2. 隐藏主屏幕
 */
const openMiniMusicPlayer = () => {
  const url = getMiniPlayerUrl()
  if (win.ipcRenderer) {
    win.ipcRenderer.send('open-miniMusicPlayer', url)
  } else {
    window.location.href = url
    console.log('############ 请打开 APP 使用～ ############')
  }
}

/**
 * 1. 最小化缩小的播放器
 */
const minimizeMinMusicPlayer = () => {
  if (win.ipcRenderer) {
    win.ipcRenderer.send('min-miniMusicPlayer')
  }
}

/**
 * 缩小的播放器 => 放大
 * 1. 关闭缩小的播放器
 * 2. 显示主屏幕
 */
const maxMinMusicPlayer = () => {
  if (win.ipcRenderer) {
    win.ipcRenderer.send('max-miniMusicPlayer')
  }
}

export { openMiniMusicPlayer, minimizeMinMusicPlayer, maxMinMusicPlayer }
