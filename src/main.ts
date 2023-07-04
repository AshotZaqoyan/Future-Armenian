import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Future Armenian",
		icon: 'src/img/FutureArmenian.ico',
		webPreferences: {
			nodeIntegration: true
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
