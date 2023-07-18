import * as fs from 'fs';
import * as path from 'path';

export function saveData(filePath, data) {
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

	// Write data to file
	fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
		if (err) {
			console.error('Error writing to JSON file:', err);
			return;
		}
	});
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