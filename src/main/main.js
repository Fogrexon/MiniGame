/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');

const createWindow = () => {
  const options = {
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
  };

  const win = new BrowserWindow(options);
  win.webContents.openDevTools(); 
  win.loadFile(`${__dirname}/../../public/index.html`);
};

electronReload(`${__dirname}`, {
  electron: require(`${__dirname}/../../node_modules/electron`)
});

app.whenReady().then(createWindow);