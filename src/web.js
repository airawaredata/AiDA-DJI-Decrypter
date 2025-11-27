// src/web.js
import { zipSync } from 'fflate';
import FileParser from './core/parse-file.js';

// Accept onProgress here
export const parseFile = async (fileData, onProgress) => {
    const fileParser = new FileParser();
    // Pass it down to the parser
    await fileParser.parse(fileData, onProgress);
    return fileParser.getFiles();
}

export const zipResults = (results) => {
    const cleanedResults = results.map((result) => {
        const filePath = result.filePath
            .split('/')
            .filter((item) => item !== '')
            .join('/')
            .replace(/\.enc$/, '');

        if (filePath.endsWith('.empty')) return {
            filePath: filePath.replace(/\.empty$/, ''),
            data: new Uint8Array()
        }

        return {
            filePath,
            data: result.data
        }
    }).reduce((acc, result) => {
        acc[result.filePath] = result.data;
        return acc;
    }, {});


    const zipped = zipSync({ ...cleanedResults }, {
        level: 1,
        mtime: new Date()
    });

    return zipped;
}