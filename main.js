const electron = require('electron');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = electron;
let win

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
    // show dialog
    const fullpath = dialog.showSaveDialogSync(win, { defaultPath: 'filename.txt' });

    if (fullpath) {
        console.log(fullpath);
        fs.writeFile(fullpath, text, (err) => {
            if (err) {
                console.log('There was an error', err);
            } else {
                console.log('File has been saved');
            }
        });
    } else {
        console.log('Save operation canceled by the user');
    }
});


