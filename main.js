const {app, BrowserWindow} = require('electron')

let win = null

app.on('readt', function(){
    //specific electron window size
    win = new BrowserWindow({width: 1000, height: 600});

    //entry point as local host for dev environment
    win.loadURL('http://localhost:4000');

    //to be removed
    win.webContents.openDevTools();

    win.on('closed', function(){
        win = null;
    });

});

app.on('activate', function(){
    if (win == null) {
        createWindow();
    }
});

app.on('window-all-closed', function(){
    if (process.platform != 'darwin') {
        app.quit();
    }
});

