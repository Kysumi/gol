import { app, BrowserWindow, Menu } from 'electron';
import {consoleWindow} from '../gol/tools/console'


//clean this later and add it to its own file?
let menu = Menu.buildFromTemplate([
  {
  label: "GOL",
  submenu: [
    {
      label:'Exit',
      click: function(){
          win.close();
      }
    }
    ]
  },
  {
    label: "Tools",
    submenu: [
      {
        label:'Dev Tools',
        click: function(){
            win.webContents.openDevTools();
        }
      },  
      {
        label:'Console',
        click: function(){
          debugWindow.show();
        }
      }
      ]
    }
]);


let debugWindow : BrowserWindow;
let win : BrowserWindow;
const isDev = process.env.NODE_ENV === 'development';

app.on('ready', () => {
  win = new BrowserWindow();
  const url = isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`;
  win.loadURL(url);
  win.setMenu(menu);

  debugWindow = consoleWindow();

});
