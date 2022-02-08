/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import electronReload from 'electron-reload';

const createWindow = () => {
  const options: BrowserWindowConstructorOptions = {
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  };

  const win = new BrowserWindow(options);
  win.loadFile(`${__dirname}/../public/index.html`);
};

electronReload(`${__dirname}`, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

app.whenReady().then(createWindow);