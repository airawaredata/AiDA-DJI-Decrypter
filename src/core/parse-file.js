// src/core/parse-file.js
import ParseLoghItem from './logh-item.js';
import ParseDatItem from './dat-item.js';

class FileParser {
    constructor() {
        this.fileChunks = [];
    }

    // Added onProgress argument
    async parse(file, onProgress) { 
        const fileLength = file.length;
        let currentOffset = 0;
        
        if (file[0] !== 0xA4) throw new Error("Invalid file");
        
        let lastYieldTime = Date.now();

        while (currentOffset < fileLength) {
            
            // Periodically yield to UI and update progress
            if (Date.now() - lastYieldTime > 50) {
                await new Promise(resolve => setTimeout(resolve, 0));
                lastYieldTime = Date.now();

                // Calculate and report progress
                if (onProgress) {
                    const percent = Math.round((currentOffset / fileLength) * 100);
                    onProgress(percent);
                }
            }

            if (file[currentOffset] !== 0xA4) {
                currentOffset++;
                continue;
            }

            const datItem = new ParseDatItem();
            const parsedBytes = datItem.parse(file, currentOffset);

            if (parsedBytes === -1) { 
                currentOffset++;
                continue;
            }

            if (datItem.data[0] === 0x4C && datItem.data[1] === 0x4F && datItem.data[2] === 0x47 && datItem.data[3] === 0x48) {
                const loghItem = new ParseLoghItem();
                await loghItem.parse(datItem.data); 

                this.fileChunks.push({
                    filePath: datItem.filePath,
                    data: loghItem.data
                });
            } else {
                this.fileChunks.push({
                    filePath: datItem.filePath,
                    data: datItem.data
                });
            }
            currentOffset += parsedBytes;
        }

        // Ensure we hit 100% at the end
        if (onProgress) onProgress(100);
        return this;
    }

    getFiles() {
        return this.fileChunks;
    }
}

export default FileParser;