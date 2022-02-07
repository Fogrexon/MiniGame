import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

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

app.whenReady().then(createWindow);
