const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)

globalShortcut.register("CommandOrControl+Shift+R", () => {
    win.reload();
  });
}

app.whenReady().then(() => {
  createWindow()
  Menu.setApplicationMenu(null)
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
// Handle file reading requests from the renderer
ipcMain.handle('fs-read-file', async (event, filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error("Failed to read file:", error);
    throw error;
  }
});

// Handle file writing requests from the renderer
ipcMain.handle('fs-write-file', async (event, filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, data, 'utf-8');
    return 'File written successfully';
  } catch (error) {
    console.error("Failed to write file:", error);
    throw error;
  }
});
