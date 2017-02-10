'user strict';

const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname);

let win = null

app.on('ready', function(){
    //specific electron window size
    win = new BrowserWindow({width: 1000, height: 600});

    //entry point as local host for dev environment
    if (process.env.PACKAGE === 'true'){
        win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
        }));
    } else {
        win.loadURL(process.env.HOST);
        win.webContents.openDevTools();
    }

    //to be removed
    win.webContents.openDevTools();

    win.on('closed', function(){
        win = null;
    });

});

app.on('activate-with-no-open-windows', function(){
    if (win) {
        win.show();
    }
});

app.on('window-all-closed', function(){
    app.quit();
});

