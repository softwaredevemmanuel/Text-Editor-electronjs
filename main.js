const {BrowserWindow, app} = require('electron');

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:800,
        height:600
    })
}
app.whenReady().then(() =>{
    createWindow();
})