const { app, BrowserWindow, Tray, ipcMain } = require('electron')
const path = require('path')
// eslint-disable-next-line
const url = require('url')
// console.log(process.env.REACT_APP_NODE_ENV)
// 是否开发环境
const isDev = process.env.REACT_APP_NODE_ENV === 'development'

let win = null
// 任务栏图标
let tray = null

function createWindow() {
  tray = new Tray(path.join(__dirname, './imgs/tray_20.png'))
  // 创建浏览器窗口
  win = new BrowserWindow({
    title: 'Fate Music',
    width: isDev ? 1550 : 1000,
    height: 670,
    resizable: false,
    // titleBarStyle: 'hidden',
    icon: path.join(__dirname, './icons/favicon.icns'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      preload: path.join(__dirname, './js/preload.js')
    }
  })

  if (isDev) {
    // 加载远程URL,用于项目开发
    win.loadURL('http://localhost:1221/')
    // 打开开发者工具，默认不打开
    win.webContents.openDevTools()
  } else {
    // 或加载本地HTML文件，用于项目打包
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  // 窗口是否可以拖动
  win.setMovable(true)

  // 关闭window窗口
  win.on('closed', function() {
    win = null
  })

  // Tray 模块
  tray.setToolTip('Fate Music')
  // 任务栏图标点击事件
  tray.on('click', () => {
    win.show()
  })

  // 当前进程类型是browser主进程还是renderer渲染进程，browser
  console.log(`进程类型: ${process.type}`)
  // NodeJS版本
  console.log(`NodeJS版本: ${process.versions.node}`)
  // Chrome版本
  console.log(`Chrome版本: ${process.versions.chrome}`)
  // Electron版本
  console.log(`Electron版本: ${process.versions.electron}`)
  // 资源目录路径
  console.log(`资源目录路径: ${process.resourcesPath}`)
}

// 当 Electron 完成初始化，创建浏览器窗口
app.on('ready', createWindow)

// 所有窗口关闭时，退出
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (win === null) {
    createWindow()
  }
})

// 主进程事件
// 1. 缩小音乐播放器
ipcMain.on('min-app-music-player', () => {
  console.log('=== 缩小音乐播放器 ===')
  const childWin = new BrowserWindow({
    title: 'Fate Music',
    width: 340,
    height: 60,
    // titleBarStyle: 'hidden',
    frame: false,
    show: false
  })
  childWin.loadURL('https://uinika.github.io/')
  childWin.once('ready-to-show', () => {
    win.hide()
    childWin.show()
  })
})
