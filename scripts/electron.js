// 创建本地浏览器窗口
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  // 创建浏览器窗口
  // mainWindow = new BrowserWindow({ width: 1000, height: 670 })
  win = new BrowserWindow({
    width: 1000,
    // width: 1550,
    height: 670,
    resizable: false,
    titleBarStyle: 'hidden'
  })

  // 加载远程URL,用于项目开发
  // win.loadURL('http://localhost:3000/')
  // 打开开发者工具，默认不打开
  // win.webContents.openDevTools()

  // 或加载本地HTML文件，用于项目打包
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  // 窗口是否可以拖动
  win.setMovable(true)

  // 关闭window窗口
  win.on('closed', function() {
    win = null
  })
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
