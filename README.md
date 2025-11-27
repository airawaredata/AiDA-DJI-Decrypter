


# DJI DAT Decryptor

A tool to decrypt `.DAT` flight log files exported by DJI Assistant 2. This project supports both a **Command Line Interface (CLI)** and a **Web Interface**.

## Supported Devices
* DJI Goggles 2
* DJI Avata
* DJI O3 Air Units

---

## Prerequisites
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* npm (comes with Node.js)

---

## Installation

1.  **Clone the repository** (or download and extract the source code):
    ```bash
    git clone [https://github.com/D3VL/DJI-DAT-Decryptor.git](https://github.com/D3VL/DJI-DAT-Decryptor.git)
    cd DJI-DAT-Decryptor
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

---

## Usage: Command Line Interface (CLI)

Use this mode to decrypt files directly from your terminal or for batch processing.

### 1. Build the CLI Tool
Run the build script to compile the source code:
```bash
npm run build::cli
````

*This creates a `dist/` directory containing the executable script.*

### 2\. Run the Decryptor

Run the script using Node.js, providing the input file and output directory:

**Syntax:**

```bash
node dist/dji-dat-decryptor.js <input_file.DAT> <output_directory>
```

**Example:**

```bash
node dist/dji-dat-decryptor.js ./flight_logs/FLY001.DAT ./decrypted_logs
```

-----

## Usage: Web Interface

Use this mode for a graphical drag-and-drop interface.

### 1\. Asset Setup (Branding)

Ensure your branding images are placed in the `public/` folder:

  * `public/logo.png` (Your main logo icon)
  * `public/text.png` (Your brand text)

### 2\. Build the Web Bundle

Compile the web-compatible JavaScript bundle:

```bash
npm run build::web
```

*This updates `public/decryptor.bundle.js`.*

### 3\. Set Up Localhost (Recommended)

While you can try opening `public/index.html` directly, modern browsers often block file operations for security reasons (CORS errors). Running a local server is the most reliable method.

**Option A: Using Node.js (Easiest)**
You can use the `serve` package directly without installing it globally:

1.  Run the command:
    ```bash
    npx serve public
    ```
2.  The terminal will show a URL (usually `http://localhost:3000`).
3.  Open that URL in your browser.

**Option B: Using Python**
If you have Python installed, you can run a simple server from the `public` directory:

1.  Navigate to the public folder: `cd public`
2.  Run: `python3 -m http.server`
3.  Go to `http://localhost:8000` in your browser.

**Option C: VS Code Live Server**
If you use Visual Studio Code:

1.  Install the **Live Server** extension.
2.  Right-click on `public/index.html`.
3.  Select **"Open with Live Server"**.

-----

## Troubleshooting

  * **"Page Unresponsive"**: The web interface includes a yield mechanism to prevent freezing during large file decryption. Ensure you have rebuilt the project (`npm run build::web`) after any code changes.
  * **Missing output**: Ensure the output directory for the CLI command is valid.

## License

MIT License

```
```