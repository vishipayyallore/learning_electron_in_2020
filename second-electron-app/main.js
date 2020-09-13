'use strict';

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const url = require('url');

// Variable
const isMac = process.platform === 'darwin' ? true : false

function createWindow() {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 400,
        icon: `${__dirname}/assets/icons/sum.png`,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Removing the Menu Bar.
    // mainWindow.setMenu(null);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
    .then(createWindow)
    .then(() => {
        const mainMenu = Menu.buildFromTemplate(menu)
        Menu.setApplicationMenu(mainMenu)
    });

const menu = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
        role: 'fileMenu',
    },
    {
        label: 'Help',
        submenu: [
          { label: 'Welcome' },
          { type: 'separator' },
          { role: 'About' },
        ],
      }
]

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    app.quit();
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("btnSum", function (event, arg) {
    // alert(arg);
    console.log(`Received the Event: ${arg}`);
});



