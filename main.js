const electron = require('electron');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog, Menu } = electron;
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
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
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
            win.webContents.send('saved', 'success')
        }
    });
}

const menuTemplate = [
    ...(process.platform == 'darwin' ? [{
        label: app.getName(),
        submenu : [
            {role: 'about'}
        ]
    }] : []),
  
    { 
        label: "File",
        submenu:[
            {
                label: "Save",
                click(){
                    console.log("Save from menu")
                }
            },
            {
                label: "Save As",
                click(){
                    console.log("Save As from menu")
                }
            },

        ]
    },
    {
        // custom edit menu from electron
        role: 'editMenu'
    }
]

