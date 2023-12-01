const { app, BrowserWindow } = require('electron');


app.on('ready', () => {
    console.log("app is tready");
    let win = new BrowserWindow({

    })
    win.loadFile('index.html')
});
