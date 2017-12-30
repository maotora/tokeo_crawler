import path from 'path';
import url from 'url';
import { autoUpdater } from 'electron-updater'
import {app, crashReporter, BrowserWindow, Menu} from 'electron';

const isDevelopment = (process.env.NODE_ENV === 'development');

// autoUpdater.setFeedURL({
//     provider: 'generic',
//     url: 'https://code.hackeac.com/Mijengo/Mijengo_desktop/releases'
// })

let mainWindow = null;
let forceQuit = false;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const extensions = [
        'REACT_DEVELOPER_TOOLS',
        'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
        try {
            await installer.default(installer[name], forceDownload);
        } catch (e) {
            console.log(`Error installing ${name} extension: ${e.message}`);
        }
    }
};

crashReporter.start({
    productName: 'Mijengo',
    companyName: 'HackEAC',
    submitURL: 'https://mijengo.hackeac.com/api/crashes',
    uploadToServer: false
});

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// try {
//     let win;

//     function sendStatusToWindow(text) {
//         win = new BrowserWindow();
//         console.log(text);
//         win.webContents.send('message', text);
//     }
//     function createDefaultWindow() {
//         win = new BrowserWindow();
//         win.webContents.openDevTools();
//         win.on('closed', () => {
//             win = null;
//         });
//         win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
//         return win;
//     }
//     autoUpdater.on('checking-for-update', () => {
//         sendStatusToWindow('Checking for update...');
//     })
//     autoUpdater.on('update-available', (info) => {
//         sendStatusToWindow('Update available.');
//     })
//     autoUpdater.on('update-not-available', (info) => {
//         sendStatusToWindow('Update not available.');
//     })
//     autoUpdater.on('error', (err) => {
//         sendStatusToWindow('Error in auto-updater. ' + err);
//     })
//     autoUpdater.on('download-progress', (progressObj) => {
//         let log_message = "Download speed: " + progressObj.bytesPerSecond;
//         log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//         log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//         sendStatusToWindow(log_message);
//     })
//     autoUpdater.on('update-downloaded', (info) => {
//         sendStatusToWindow('Update downloaded');
//     });
// } catch(err) {
//     log.error(err)
// }

app.on('ready', async () => {
    if(isDevelopment) {
        await installExtensions();
    }

    try {
        autoUpdater.checkForUpdates();
        autoUpdater.checkForUpdatesAndNotify();
    } catch(err) {
        console.error('Something went wrong ', err)
    }

    mainWindow = new BrowserWindow({ 
        width: 1371, 
        height: 787,
        minWidth: 640,
        minHeight: 480,
        show: false ,
        //Todo frame: false,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // show window once on first load
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.show();
    });

    mainWindow.webContents.on('did-finish-load', () => {
        // Handle window logic properly on macOS:
        // 1. App should not terminate if window has been closed
        // 2. Click on icon in dock should re-open the window
        // 3. ⌘+Q should close the window and quit the app
        if (process.platform === 'darwin') {
            mainWindow.on('close', function (e) {
                if (!forceQuit) {
                    e.preventDefault();
                    mainWindow.hide();
                }
            });

            app.on('activate', () => {
                mainWindow.show();
            });

            app.on('before-quit', () => {
                forceQuit = true;
            });
        } else {
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
        }
    });

    if (isDevelopment) {
        // auto-open dev tools
        mainWindow.webContents.openDevTools();

        // add inspect element on right click menu
        mainWindow.webContents.on('context-menu', (e, props) => {
            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.inspectElement(props.x, props.y);
                }
            }]).popup(mainWindow);
        });
    }
});
