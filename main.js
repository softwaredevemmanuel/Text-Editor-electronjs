const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;


app.on('ready', () => {
    console.log("app is tready");
    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    win.loadFile('index.html')
});

ipcMain.on('save', (event, text)=>{
    console.log(text)
})
