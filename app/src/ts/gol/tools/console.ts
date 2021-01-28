import { app, BrowserWindow, Menu } from 'electron';

export const consoleWindow  = () => {
    let window = new BrowserWindow({
        width : 800, height: 600, show: false
    })

       window.on('close', (e) => {
           e.preventDefault();
           window.hide();
       })

       window.on('show', () => {        
           window.loadURL('file://' + __dirname + "/../app/public/console.html");
       })
    return window;
}