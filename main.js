const electron = require('electron');
const fs = require('fs');
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
    fs.writeFile('samplefile.txt', text, (err)=>{
        if(err){
            console.log('There was an error', err)
        }else{
            console.log('File has been saved') 
        }
    })
})
