const { app, BrowserWindow, Tray, ipcMain } = require('electron')
const path = require('path')
// eslint-disable-next-line
const url = require('url')
// console.log(process.env.REACT_APP_NODE_ENV)
// 是否开发环境
const isDev = process.env.REACT_APP_NODE_ENV === 'development'

// 主窗口
let mainWindow = null
// 任务栏图标
let tray = null
// 自窗口1
let childWin1 = null

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
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
    mainWindow.loadURL('http://localhost:1221/')
    // 测试打包后效果
    // mainWindow.loadURL(
    //   url.format({
    //     pathname: path.join(__dirname, '../build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    //   })
    // )
    // tray 图片尺寸建议 20*20
    tray = new Tray(path.join(__dirname, './extraResources/imgs/tray_20.png'))
    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools()
  } else {
    // 对于 tray 中使用的静态图片，打包后，可以在应用的 extraResources 文件下找到
    tray = new Tray(
      path.join(__dirname, '../../extraResources/imgs/tray_20.png')
    )
    // 或加载本地HTML文件，用于项目打包
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  // 窗口是否可以拖动
  mainWindow.setMovable(true)

  // 关闭window窗口
  mainWindow.on('closed', function() {
    mainWindow = null
    tray.destroy()
  })

  // Tray 模块
  tray.setToolTip('Fate Music')
  // 任务栏图标点击事件
  tray.on('click', () => {
    mainWindow.show()
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
  if (mainWindow === null) {
    createWindow()
  }
})

// 主进程事件
// 1. 缩小音乐播放器
ipcMain.on('min-app-music-player', (_, arg) => {
  console.log('=== 缩小音乐播放器 ===', arg)
  childWin1 = new BrowserWindow({
    title: 'Fate Music',
    width: 340,
    height: 65,
    // titleBarStyle: 'hidden',
    frame: false,
    show: false,
    resizable: false
  })
  childWin1.loadURL(arg)
  childWin1.once('ready-to-show', () => {
    mainWindow.hide()
    childWin1.show()
  })

  // 关闭window窗口
  childWin1.on('closed', function() {
    childWin1 = null
  })
})
