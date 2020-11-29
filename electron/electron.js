// 创建本地浏览器窗口
const { app, BrowserWindow } = require('electron')
const path = require('path')
// eslint-disable-next-line
const url = require('url')
// console.log(process.env.REACT_APP_NODE_ENV)
// 是否开发环境
const isDev = process.env.REACT_APP_NODE_ENV === 'development'
let win

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: isDev ? 1550 : 1000,
    height: 670,
    resizable: false,
    // titleBarStyle: 'hidden',
    icon: path.join(__dirname, './icons/favicon.icns'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true
    }
  })

  if (isDev) {
    // 加载远程URL,用于项目开发
    win.loadURL('http://localhost:3000/')
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

  // const electronIcon = new Tray(path.join(__dirname, 'electron.png'))
  // electronIcon.setToolTip('Fate Music App')
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
