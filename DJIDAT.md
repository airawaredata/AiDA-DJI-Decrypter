Directory structure:
└── DJI-DAT-Decryptor-main/
    ├── README.md
    ├── LICENCE.md
    ├── package.json
    ├── webpack.cli.cjs
    ├── webpack.web.cjs
    ├── public/
    │   └── index.html
    └── src/
        ├── cli.js
        ├── config.js
        ├── web.js
        └── core/
            ├── dat-item.js
            ├── logh-item.js
            ├── parse-file.js
            └── functions/
                ├── decrypt.js
                └── helpers.js

================================================
FILE: README.md
================================================
[Binary file]


================================================
FILE: LICENCE.md
================================================
MIT License

Copyright (c) 2023 D3VL LTD

“Commons Clause” License Condition v1.0

The Software is provided to you by the Licensor under the License, as defined below, subject to the following condition.

Without limiting other conditions in the License, the grant of rights under the License will not include, and the License does not grant to you, the right to Sell the Software.

For purposes of the foregoing, “Sell” means practicing any or all of the rights granted to you under the License to provide to third parties, for a fee or other consideration (including without limitation fees for hosting or consulting/ support services related to the Software), a product or service whose value derives, entirely or substantially, from the functionality of the Software. Any license notice or attribution required by the License must also include this Commons Clause License Condition notice.

Software: DJI DAT Decryptor

License: MIT with “Commons Clause” License Condition v1.0

Licensor: D3VL LTD

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


================================================
FILE: package.json
================================================
{
  "name": "dji-dat-decryptor",
  "version": "1.0.1",
  "description": "Decrypt DJI DAT files exported by Assistant 2",
  "type": "module",
  "main": "./src/cli.js",
  "scripts": {
    "build::cli": "npx webpack --config webpack.cli.cjs",
    "build::web": "npx webpack --config webpack.web.cjs"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/D3VL/DJI-DAT-Decryptor.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/D3VL/DJI-DAT-Decryptor/issues"
  },
  "homepage": "https://github.com/D3VL/DJI-DAT-Decryptor#readme",
  "dependencies": {
    "aes-cmac": "^2.0.0",
    "aes-js": "^3.1.2",
    "fflate": "^0.7.4"
  },
  "devDependencies": {
    "webpack": "^5.24.2",
    "webpack-cli": "^4.10.0"
  }
}



================================================
FILE: webpack.cli.cjs
================================================
const path = require('path');

module.exports = {
    entry: './src/cli.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dji-dat-decryptor.js',
    },
    target: 'node',
    mode: 'production',
};



================================================
FILE: webpack.web.cjs
================================================
const path = require('path');

module.exports = {
    entry: './src/web.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'decryptor.bundle.js',
        libraryTarget: 'var',
        library: 'DjiDatDecryptor'
    },
    target: 'web',
    mode: 'production',
};



================================================
FILE: public/index.html
================================================
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- scale meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DJI Dat Decryptor</title>
    <!-- Minimal effort! -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <style>
        /* dropzone */
        .dropzone {
            border: 2px dashed #0087F7;
            border-radius: 5px;
            background: white;
            min-height: 150px;
            padding: 54px 54px;
        }

        #file {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }

        /* log container */
        .log {
            height: 200px;
            overflow-y: scroll;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="display-3">DJI Dat Decryptor</h1>
        <p class="lead">Decrypt the .DAT files exported by DJI Assistant.</p>
        <p>
            👀 Check out the accompanying blog post 👉 <a href="https://d3vl.com/blog/is-your-dji-o3-spying-on-you/">Is Your DJI O3 Spying On You?</a>
            <br>
            ⚠️ Currently only supports Goggles 2, Avata and O3 Air Units!
        </p>

        <!-- dropzone using a html card -->
        <div class="card border p-5 dropzone text-center">
            <span class="display-6 text-muted d-none d-sm-block mt-5">Drop .DAT file here!</span>
            <span class="display-6 text-muted d-sm-none mt-5">Tap here to upload file</span>

            <small id="filedropstatus" class="text-muted m-3">&nbsp;</small>

            <!-- input file -->
            <input type="file" id="file" accept=".dat">
        </div>

        <!-- Log output -->
        <div class="card border mt-5 bg-dark">
            <div class="card-body text-light">
                <h5 class="card-title">Log</h5>
                <p class="card-text log" id="log">

                </p>
            </div>
        </div>

        <!-- footer -->
        <div class="w-100 text-center mt-5">
            <p class="card-text">
                Built By <a href="https://d3vl.com/" style="color:#ff3e3e">D3VL</a><br>
            </p>
            <p class="text-muted">
                Huge thanks to Joonas from <a href="https://fpv.wtf/" style="color:#507ac3">fpv.wtf</a><br>
                without whom this would not have been possible.
            </p>
            <p>
                An open source project<br><a href="https://github.com/D3VL/DJI-Dat-Decryptor" class="text-muted">D3VL/DJI-Dat-Decryptor</a>
            </p>
        </div>

    </div>

    <script src="decryptor.bundle.js"></script>
    <script>

        const logItem = (item) => {
            document.querySelector('#log').innerHTML += `${item}<br/>`;
            // scroll to bottom
            document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
        };

        const onFileDrop = async (file) => {
            // show file name
            document.querySelector('#filedropstatus').innerHTML = file.name;

            // check file ends in .DAT, if not, return
            if (!file.name?.toLowerCase().endsWith('.dat')) {
                document.querySelector('#filedropstatus').innerHTML = 'File is not a .DAT file!';
                // empty file input
                document.querySelector('#file').value = '';
                return;
            }

            logItem(`File: ${file.name}`);
            logItem(`Reading file...`)


            const reader = new FileReader();
            reader.readAsArrayBuffer(file);


            reader.addEventListener('progress', (event) => {
                if (event.loaded && event.total) {
                    const percent = (event.loaded / event.total) * 100;
                    logItem(`Progress: ${Math.round(percent)}%`);
                }
            });

            reader.addEventListener('load', async (event) => {
                const fileData = event.target.result;
                // Do something with result

                // get the file contents as a uint8array

                logItem(`File size: ${fileData.byteLength} bytes`);
                logItem(`Decrypting file...`);
                logItem(`Please be patient, this may take a while...`);
                let parsedFile = null;
                // create a new FileReader
                try {
                    parsedFile = await DjiDatDecryptor.parseFile(new Uint8Array(fileData));
                } catch (e) {
                    logItem(`Error: ${e.message}`);
                    return;
                }

                if (!parsedFile) {
                    logItem(`Error: Some strange error occured!`);
                    return;
                }

                if (parsedFile.length === 0) {
                    logItem(`Error: No files found!`);
                    return;
                }

                logItem(`File decrypted!`);
                logItem(`Found ${parsedFile.length} files inside!`);

                logItem(`Creating zip file...`);
                // create a new zip file
                const zip = DjiDatDecryptor.zipResults(parsedFile);
                logItem(`Zip file created!`);
                logItem(`Downloading zip file...`);
                // download the zip file, from uint8array to blob
                const blob = new Blob([zip], { type: 'application/zip' });
                const url = URL.createObjectURL(blob);

                // insert shadow element and click it
                document.body.insertAdjacentHTML('beforeend', `<a id="download" href="${url}" download="${file.name.replace('.DAT', '')}.zip"></a>`);
                document.querySelector('#download').click();
                document.querySelector('#download').remove();

                setTimeout(() => {
                    logItem(`File didn't download? <a href="${url}" download="${file.name.replace('.DAT', '')}.zip">Click here</a> to download it manually.`);
                }, 1000);
            });
        };

        // watch for file input
        document.querySelector('#file').addEventListener('input', (e) => {
            onFileDrop(e.target.files[0]);
        });

    </script>

</body>

</html>


================================================
FILE: src/cli.js
================================================
import FileParser from './core/parse-file.js';
import fs from 'fs';

// get parameter 0 for input file
const IN = process.argv[2];
const OUT = process.argv[3];


if ((!IN || !OUT) || (IN === '--help' || IN === '-h')) {
    console.log("DJI DAT Decryptor by D3VL");
    console.log("Usage: node dji-dat-decryptor <input file> <output dir>");
    process.exit(1);
}

const file = fs.readFileSync(IN);

(async () => {
    console.log("Parsing file");
    console.log("This may take a while, please be patient...");

    const fileParser = new FileParser();

    try {
        await fileParser.parse(file);
    } catch (e) {
        console.log(e.toString());
        process.exit(1);
    }

    const files = fileParser.getFiles();

    // make dir OUT
    if (!fs.existsSync(OUT)) {
        console.log("Creating output directory");
        fs.mkdirSync(OUT);
    }

    for (const file of files) {
        const path = file.filePath
            .replace(/\/\//g, '/')
            .split('/')
            .filter((item) => item !== '');

        let currentPath = [OUT]
        let depth = 0;
        for (const dir of path) {
            depth++;
            currentPath.push(dir);
            const currentPathString = currentPath.join('/');

            // if this is the last item, it's a file, not a dir we need to write
            if (depth === path.length) {

                // remove .enc and .empty from the file name
                const filePathClean = currentPathString.replace(/\.enc$/, '').replace(/\.empty$/, '');

                // if file ends with .empty, it's an empty file, make it empty
                if (currentPathString.endsWith('.empty')) {
                    fs.writeFileSync(filePathClean, '');
                } else {
                    fs.writeFileSync(filePathClean, file.data);
                }

                console.log("Wrote file: " + filePathClean);
            } else {
                // check if the dir exists, if not, create it
                if (!fs.existsSync(currentPathString)) {
                    console.log("Creating directory: " + currentPathString);
                    fs.mkdirSync(currentPathString);
                }
            }
        }
    }

    console.log("Done!");
    console.log("Files written to: " + OUT);
})();



================================================
FILE: src/config.js
================================================
export const offsets = {
    DAT: {
        magic: [0x00, 0x01], // first byte of header
        dataLength: [0x01, 0x04], // how many bytes of data is there after the DAT header
        unknownA: [0x05, 0x02], // not too sure what these 2 bytes are
        product: [0x07, 0x05], // looks like G-E3T
        filePath: [0x0C, 0xFF], // 255 bytes of file path
        unknownB: [0x10B, 0x10], // not too sure what these 16 bytes are, maybe flags?
    },
    LOGH: {
        magic: [0x00, 0x04], // Always LOGH (4C 4F 47 48)
        unknownC: [0x04, 0x03], // not too sure what these 3 bytes are, padding for the magic?
        dataOffset: [0x08, 0x08], // How long the LOGH header is before we get to the data
        dataLength: [0x10, 0x08], // How long the data is
        modelType: [0x18, 0x10], // Model number of the device
        serialNumber: [0x28, 0x10], // Serial number of the device
        cmacBytes: [0x18, 0x44]
    }
}

export const keys = {
    "e3t_zv900": { // Goggles 2
        key: [181, 44, 153, 102, 153, 211, 91, 20, 228, 205, 88, 106, 232, 120, 176, 109], // -> b52c996699d35b14e4cd586ae878b06d
        iv: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "e3t_wm169": { // Avata and O3 Air Unit
        key: [181, 44, 153, 102, 153, 211, 91, 20, 228, 205, 88, 106, 232, 120, 176, 109], // -> b52c996699d35b14e4cd586ae878b06d
        iv: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}



================================================
FILE: src/web.js
================================================
import { zipSync } from 'fflate';
import FileParser from './core/parse-file.js';

export const parseFile = async (fileData) => {
    const fileParser = new FileParser();
    await fileParser.parse(fileData);
    return fileParser.getFiles();
}

export const zipResults = (results) => {
    // clean up the file names
    const cleanedResults = results.map((result) => {
        const filePath = result.filePath
            .split('/') // split on /
            .filter((item) => item !== '') // remove empty items (i.e. //)
            .join('/') // join back together
            .replace(/\.enc$/, ''); // removefrom the file name


        // if file ends with .empty, it's an empty file, make it empty
        if (filePath.endsWith('.empty')) return {
            filePath: filePath.replace(/\.empty$/, ''),
            data: new Uint8Array()
        }

        // else return the data
        return {
            filePath,
            data: result.data
        }
    }).reduce((acc, result) => {
        // convert into a key value pair, zipSync will take care of the folder structure
        acc[result.filePath] = result.data;
        return acc;
    }, {});


    const zipped = zipSync({ ...cleanedResults }, {
        level: 1,
        mtime: new Date()
    });

    return zipped;
}



================================================
FILE: src/core/dat-item.js
================================================
import { offsets } from '../config.js';
import { toAscii, getOffsets, toIntLE } from './functions/helpers.js';

const headerLength = 0x11B;

class DatItem {

    constructor() {
        this.isParsed = false;
        this.data = [];
        this.product = "";
        this.filePath = "";
    }

    parse(datain, offset = 0) { // returns the number of bytes parsed, -1 if error
        if (this.isParsed) return -1;
        // check the first byte is 0xA4, our magic number
        if (datain[0] !== 0xA4) return -1;

        // extract 
        this.product = toAscii(datain.slice(...getOffsets(offsets.DAT.product, offset)), true);
        this.filePath = toAscii(datain.slice(...getOffsets(offsets.DAT.filePath, offset)), true);

        const dataLength = toIntLE(datain.slice(...getOffsets(offsets.DAT.dataLength, offset)));

        this.data = datain.slice(offset + headerLength, offset + headerLength + dataLength);

        this.isParsed = true;

        return dataLength + headerLength;
    }


}

export default DatItem;



================================================
FILE: src/core/logh-item.js
================================================
import { offsets } from '../config.js';
import decrypt from './functions/decrypt.js';
import { toAscii, getOffsets, toIntLE } from './functions/helpers.js';

class LoghItem {
// 
    constructor() {
        this.isParsed = false;
        this.data = [];
        this.cmacBytes = null;
        this.serialNumber = "";
        this.modelType = "";
    }

    async parse(data) {
        if (this.isParsed) throw new Error("LoghItem is already parsed");

        // check the first 4 bytes are 0x4C4F4748, our magic number
        if (data[0] !== 0x4C || data[1] !== 0x4F || data[2] !== 0x47 || data[3] !== 0x48) throw new Error("Invalid LOGH");

        // extract the product code
        this.modelType = toAscii(data.slice(...getOffsets(offsets.LOGH.modelType))).replace(/\0/g, '').trim();
        this.serialNumber = toAscii(data.slice(...getOffsets(offsets.LOGH.serialNumber))).replace(/\0/g, '').trim();

        // this is where the data starts
        const dataOffset = toIntLE(data.slice(...getOffsets(offsets.LOGH.dataOffset)));

        // this is how long the data is
        const dataLength = toIntLE(data.slice(...getOffsets(offsets.LOGH.dataLength)));

        // extract the data
        const slicedData = data.slice(dataOffset, dataOffset + dataLength);

        this.cmacBytes = data.slice(...getOffsets(offsets.LOGH.cmacBytes));

        // decrypt the data
        this.data = await decrypt(slicedData, this.modelType, this.cmacBytes);

        // count how many trailing 0x0C bytes there are for padding
        let padding = 0;
        for (let i = this.data.length - 1; i >= 0; i--) {
            if (this.data[i] === 0x0C) padding++;
            else break;
        }

        // cut the first 0x10 bytes off the data, this is garbage
        this.data = this.data.slice(0x10, this.data.length - padding);

        this.isParsed = true;
    }


}

export default LoghItem;



================================================
FILE: src/core/parse-file.js
================================================
// takes in the raw .DAT file, parses and spits out FileChunks
import ParseLoghItem from './logh-item.js';
import ParseDatItem from './dat-item.js';
import { offsets } from '../config.js';

class FileParser {
    constructor() {
        this.fileChunks = [];
    }

    async parse(file) { // file = uint8array of the raw .DAT file
        const fileLength = file.length;
        let currentOffset = 0;
        // sanity check the first byte is 0xA4 
        if (file[0] !== 0xA4) throw new Error("Invalid file");
        console.log(`File length: ${fileLength}`);

        const parseLoghItems = [];

        while (currentOffset < fileLength) {
            console.log(`Current offset: ${currentOffset}`);
            // check the first byte of the current offset is 0xA4, if not go to the next byte
            if (file[currentOffset] !== 0xA4) {
                console.log(`Skipping byte at ${currentOffset} as it is not 0xA4`);
                currentOffset++;
                continue;
            }

            const datItem = new ParseDatItem();
            const parsedBytes = datItem.parse(file, currentOffset);

            if (parsedBytes === -1) { // in theory, unreachable code
                console.log(`Skipping byte at ${currentOffset} as it is not a valid DAT item`);
                currentOffset++;
                continue;
            }


            // check if the datItem contains a LOGH item
            if (datItem.data[0] === 0x4C && datItem.data[1] === 0x4F && datItem.data[2] === 0x47 && datItem.data[3] === 0x48) {
                const loghItem = new ParseLoghItem();
                await loghItem.parse(datItem.data); // not a fan of having to await here, but it is what it is

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

        return this;
    }

    getFiles() {
        return this.fileChunks;
    }
}

export default FileParser;



================================================
FILE: src/core/functions/decrypt.js
================================================
import AES from 'aes-js';
import { keys } from '../../config.js';
import { AesCmac } from 'aes-cmac';

const decrypt = async (data, productCode, randomBytes) => {
    // find the key for the product code
    const found = keys[productCode];
    // if there is no key for the product code, throw an error
    if (!found) throw new Error("No key found for product code: " + productCode);

    // calculate the CMAC
    const aesCmac = new AesCmac(new Uint8Array(found.key));
    const msg = new Uint8Array([1, 76, 79, 71, 0, ...randomBytes, 128]); // \1LOG\0 + randomBytes + \128

    const cmac = await aesCmac.calculate(msg);

    // create a new AES object with the key
    const aes = new AES.ModeOfOperation.cbc(cmac, found.iv);

    // decrypt the data
    const decrypted = aes.decrypt(data);

    // return the decrypted data
    return decrypted;
}

export default decrypt;



================================================
FILE: src/core/functions/helpers.js
================================================

// converts hex string to Uint8Array
export const fromHexString = (hexString) => Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// converts array to hex string
export const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// converts array to ascii string
export const toAscii = (bytes, cleanString = false) => {
    const ascii = new TextDecoder().decode(bytes)
    return cleanString ? ascii.replace(/\0/g, '').trim() : ascii;
}

// returns the start and end offsets for a given offset + an offset, used to slice arrays i.e x.slice(...getOffsets(offsets.header, 0x00))
export const getOffsets = (offsets, offset = 0x00) => [
    offset + offsets[0],
    offset + offsets[0] + offsets[1]
];

export const toIntLE = (data) => data.reduce((acc, byte, i) => acc + (byte << (i * 8)), 0);


