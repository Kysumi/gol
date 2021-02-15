import { BrowserWindow } from 'electron';
import * as z from 'zod';
const fs = require('fs');

const configLocation = __dirname + '\\windows\\';
const windows: { [key: string]: BrowserWindow } = {};

const Dimensions = z.object({
  height: z.number(),
  width: z.number(),
});

const WindowOptions = z.object({
  title: z.string(),
  url: z.string(),
  size: Dimensions,
  show: z.boolean(),
  hideOnClose: z.boolean(),
});

export const sendMessage = (
  window: string,
  command: string,
  params: JSON
) => {};

export const registerWindow = (name: string, window: BrowserWindow) => {
  if (windows[name] === undefined) {
    windows[name] = window;
    return true;
  }
  return false;
};

export const createWindow = (window: string, register: boolean = true) => {
  const config = configLocation + window + '.json';
  console.log(`Loading window configuration ${config}`);

  try {
    const json = JSON.parse(fs.readFileSync(config));

    if (json) {
      const windowConf = WindowOptions.parse(json);

      let W = new BrowserWindow({
        width: windowConf.size.width,
        height: windowConf.size.width,
        show: windowConf.show,
      });

      if (windowConf.hideOnClose) {
        W.on('close', (e) => {
          e.preventDefault();
          W.hide();
        });
      }

      W.on('show', () => {
        W.loadURL(
          // "file://" + __dirname + "/../app/public/" + windowOptions.entrypoint
          windowConf.url
        );
      });

      if (register) {
        registerWindow(window, W);
      }
      return W;
    }
    console.log('Done! config loaded!');
  } catch (err) {
    console.warn(`Error while attempting to load config for ${window}`);
    console.error(err.toString());
    return false;
  }
};

export const showWindow = (window: string) => {
  let W = windows[window];
  if (W) {
    W.show();
  }
};
export const hideWindow = (window: string) => {
  let W = windows[window];
  if (W) {
    W.hide();
  }
};
