import { app, BrowserWindow, Menu } from "electron";
import {consoleWindow} from '../gol/tools/console'

const isDev = process.env.NODE_ENV === "development";

let win: BrowserWindow;
let debugWindow : BrowserWindow;


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


app.on("ready", () => {
  win = new BrowserWindow();
  const url = isDev
    ? "http://localhost:8080"
    : `file://${__dirname}/index.html`;
  win.loadURL(url);
  win.setMenu(menu);
  
  debugWindow = consoleWindow();
});
