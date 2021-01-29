import { app, BrowserWindow, Menu } from "electron";
import { string } from "zod";
const fs = require('fs');

const configLocation = __dirname +"\\..\\app\\assets\\windows\\";
const windows: { [key:string] : BrowserWindow } = {};

export const sendMessage = (window: string, command: string, params: JSON ) => {

}

export const registerWindow =(name: string, window: BrowserWindow ) => {
    if(windows[name] === undefined){
        windows[name] = window;
        return true;  
    }
    return false;   
}

export const createWindow = (window: string, register : boolean = true) => {
    
    let config = configLocation + window +".json";
    console.log(config);

    try{
        let rawdata = fs.readFileSync(config);

        if(rawdata) {   
                
            let windowOptions = JSON.parse(rawdata);

            let W = new BrowserWindow({
                width : windowOptions.size[0], height: windowOptions.size[1], show: windowOptions.show
            })
            if(windowOptions.hideOnClose){
                W.on('close', (e) => {
                    e.preventDefault();
                    W.hide();
                })
            }

            W.on('show', () => {        
                W.loadURL('file://' + __dirname + "/../app/public/" + windowOptions.entrypoint);
            })

            if(register){
                registerWindow(window,W);
            }
            return W;
        }
    }catch{
        console.log("could not find config");
        return false;
    }
    
}

export const showWindow = (window: string) =>{
    let W = windows[window];
    if(W){
        W.show();
    }
}
export const hideWindow = (window: string) =>{
    let W = windows[window];
    if(W){
        W.hide();
    }
}