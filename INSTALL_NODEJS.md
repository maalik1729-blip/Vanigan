# Install Node.js on Windows

## Option 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (Long Term Support)
   - Choose Windows Installer (.msi) - 64-bit

2. **Run the Installer**
   - Double-click the downloaded .msi file
   - Click "Next" through the setup wizard
   - Accept the license agreement
   - Choose installation location (default is fine)
   - Make sure "Add to PATH" is checked
   - Click "Install"

3. **Verify Installation**
   - Open a NEW PowerShell or Command Prompt window
   - Run these commands:
   ```bash
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., v20.11.0 and 10.2.4)

4. **Install Project Dependencies**
   - Navigate to your project folder
   - Run:
   ```bash
   npm install
   ```

## Option 2: Using Chocolatey (Package Manager)

If you have Chocolatey installed:

```bash
choco install nodejs-lts
```

Then verify:
```bash
node --version
npm --version
```

## Option 3: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```bash
winget install OpenJS.NodeJS.LTS
```

## After Installation

1. **Close and reopen your terminal** (important!)
2. Navigate to your project:
   ```bash
   cd D:\vani
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. This will install all required packages:
   - express
   - mongoose
   - axios
   - dotenv
   - helmet
   - cors
   - morgan
   - express-rate-limit
   - multer
   - cloudinary

## Troubleshooting

### "npm is not recognized"
- Make sure you opened a NEW terminal after installation
- Check if Node.js is in your PATH:
  - Search "Environment Variables" in Windows
  - Check if `C:\Program Files\nodejs\` is in PATH

### Permission Errors
- Run PowerShell as Administrator
- Or use: `npm install --no-optional`

### Slow Installation
- This is normal, npm downloads many packages
- Wait for it to complete (may take 2-5 minutes)

## What Gets Installed

After `npm install`, you'll have:
- `node_modules/` folder (contains all dependencies)
- `package-lock.json` file (locks dependency versions)

## Next Steps

After successful installation:

1. Setup MongoDB (see SETUP_INSTRUCTIONS.md)
2. Configure .env file
3. Run the server: `npm start`
