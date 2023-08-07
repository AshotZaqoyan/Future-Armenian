import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null;

function createWindow() {
	process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 850,
		title: "Future Armenian",
		icon: 'src/img/FutureArmenian.ico',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			// devTools: false // for building installer
		}
	});

	const indexPath = url.format({
		pathname: path.join(__dirname, '..', 'index.html'),
		protocol: 'file:',
		slashes: true
	});

	mainWindow.loadURL(indexPath);

	// Remove the menu bar (optional)
	//mainWindow.removeMenu();
	mainWindow.webContents.on('before-input-event', (event, input) => {
		if (input.control && input.key.toLowerCase() === 'r') {
		  mainWindow.webContents.reload();
		}
	  });
	// Open DevTools (optional)
	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
