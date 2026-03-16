# Fix: Node.js Not Recognized After Installation

## The Issue
You installed Node.js but the terminal still shows "node is not recognized" or "npm is not recognized".

## Quick Fix (Most Common)

### Step 1: Close ALL Terminals
- Close this terminal/PowerShell window
- Close your IDE (VS Code, etc.) completely
- Close any Command Prompt windows

### Step 2: Reopen Terminal
- Open a NEW PowerShell or Command Prompt
- Navigate back to your project:
```bash
cd D:\vani
```

### Step 3: Test Again
```bash
node --version
npm --version
```

## If Still Not Working

### Check Installation Path

1. Open File Explorer
2. Check if Node.js is installed at:
   - `C:\Program Files\nodejs\`
   - OR `C:\Program Files (x86)\nodejs\`

3. If the folder exists, Node.js is installed but not in PATH

### Add to PATH Manually

1. Press `Windows + R`
2. Type `sysdm.cpl` and press Enter
3. Go to "Advanced" tab
4. Click "Environment Variables"
5. Under "System variables", find "Path"
6. Click "Edit"
7. Click "New"
8. Add: `C:\Program Files\nodejs\`
9. Click OK on all windows
10. **Restart your terminal**

### Verify PATH

In PowerShell:
```powershell
$env:Path -split ';' | Select-String nodejs
```

Should show the nodejs path.

## Alternative: Reinstall Node.js

If nothing works:

1. Uninstall Node.js:
   - Settings > Apps > Node.js > Uninstall

2. Download fresh installer:
   - https://nodejs.org/
   - Get LTS version (Windows Installer .msi)

3. During installation:
   - ✅ Check "Automatically install necessary tools"
   - ✅ Check "Add to PATH"

4. Restart computer (yes, full restart)

5. Open NEW terminal and test:
```bash
node --version
npm --version
```

## Check Installation Location

Run in PowerShell:
```powershell
Get-Command node
Get-Command npm
```

Should show the path where they're installed.

## For VS Code Users

If using VS Code:
1. Close VS Code completely
2. Reopen VS Code
3. Open new terminal in VS Code (Ctrl + `)
4. Test: `node --version`

## For PowerShell Users

Try running as Administrator:
1. Right-click PowerShell
2. "Run as Administrator"
3. Navigate to project: `cd D:\vani`
4. Test: `node --version`

## Verify Installation Files

Check if these files exist:
- `C:\Program Files\nodejs\node.exe`
- `C:\Program Files\nodejs\npm.cmd`

If they don't exist, Node.js didn't install properly.

## Last Resort: Use Full Path

If PATH won't work, use full path:
```bash
"C:\Program Files\nodejs\npm.cmd" --version
"C:\Program Files\nodejs\npm.cmd" install
```

## After Node.js Works

Once you see version numbers:
```bash
node --version  # Should show: v20.x.x or similar
npm --version   # Should show: 10.x.x or similar
```

Then proceed with:
```bash
npm install
```

## Common Mistakes

❌ Not restarting terminal after installation
❌ Using old terminal window
❌ Not running as Administrator
❌ Incomplete installation
❌ Antivirus blocking installation

## Success Indicators

✅ `node --version` shows version number
✅ `npm --version` shows version number
✅ No "not recognized" errors
✅ Ready to run `npm install`

## Need Help?

If still stuck:
1. Restart your computer (full restart)
2. Reinstall Node.js with "Run as Administrator"
3. Make sure antivirus isn't blocking
4. Try Command Prompt instead of PowerShell
