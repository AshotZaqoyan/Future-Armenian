import * as fs from 'fs';
import * as path from 'path';

export function saveData(filePath, data, maxRetries = 5) {
	let retries = 0;
	let success = false;

	while (!success && retries < maxRetries) {
		const directory = path.dirname(filePath);

		// Create directory if it doesn't exist
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			// Create the file if it doesn't exist
			fs.writeFileSync(filePath, '', 'utf8');
		}

		try {
			// Write data to file
			fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
			success = true;
		} catch (err) {
			console.error('Error writing to JSON file:', err);
			retries++;
		}
	}

	if (!success) {
		console.error('Failed to save data after maximum retries.');
	}
}

export function deleteFolderRecursive(folderPath) {
	if (fs.existsSync(folderPath)) {
		fs.readdirSync(folderPath).forEach((file) => {
			const currentFilePath = path.join(folderPath, file);

			if (fs.lstatSync(currentFilePath).isDirectory()) {
				// Recursive call for subfolders
				deleteFolderRecursive(currentFilePath);
			} else {
				// Delete files inside the folder
				fs.unlinkSync(currentFilePath);
			}
		});

		// Delete the empty folder
		fs.rmdirSync(folderPath);
	} else {
		console.log(`Folder ${folderPath} does not exist.`);
	}
}

export function readData(filePath: string): Promise<any> {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, jsonString) => {
			if (err) {
				if (err.code === 'ENOENT') {
					reject(new Error('File not found'));
				} else {
					console.error('Error reading JSON file:', err);
					reject(err);
				}
				return;
			}

			try {
				const jsonData = JSON.parse(jsonString);
				resolve(jsonData);
			} catch (e) {
				console.error('Error parsing JSON file:', e);
				reject(e);
			}
		});
	});
}