const electron = require('electron');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = electron;
let win

let filePath = undefined
app.on('ready', () => {
    console.log("app is tready");
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    win.loadFile('index.html')
});

ipcMain.on('save', (event, text) => {

    if (filePath === undefined) {
        // show dialog
        const fullpath = dialog.showSaveDialogSync(win, { defaultPath: 'filename.txt' });
        if (fullpath) {
            filePath = fullpath
            writeToFile(text)
        }

    }else{
       writeToFile(text)
    }

});

function writeToFile(data){
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.log('There was an error', err);
        } else {
            console.log('File has been saved');
        }
    });
}

