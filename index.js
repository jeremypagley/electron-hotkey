const { app, BrowserWindow, globalShortcut } = require('electron');
const localShortcut = require('electron-localshortcut');

if (process.type !== 'browser') {
    console.error('Please use remote.require to import electron-hotkey in renderer process.');
}

function emit(eventName) {
    app.emit('shortcut-pressed', eventName);
}

function register(typeOrWindow, accelerator, eventName) {
    if (typeOrWindow === 'global' || typeOrWindow === 'g') {
        globalShortcut.register(accelerator, () => emit(eventName));
    } else if (typeOrWindow === 'local' || typeOrWindow === 'l') {
        localShortcut.register(accelerator, () => emit(eventName));
    } else {
        localShortcut.register(typeOrWindow, accelerator, () => emit(eventName));
    }
}

function unregister(accelerator) {
    globalShortcut.unregister(accelerator);
    localShortcut.unregister(accelerator);

    BrowserWindow.getAllWindows().forEach((win) => {
        localShortcut.unregister(win, accelerator);
    });
}

function unregisterAll() {
    globalShortcut.unregisterAll();
    localShortcut.unregisterAll();

    BrowserWindow.getAllWindows().forEach((win) => {
        localShortcut.unregisterAll(win);
    });
}

function isRegistered(accelerator) {
    const isRegisteredInGlobal = globalShortcut.isRegistered(accelerator);
    const isRegisteredInLocal = localShortcut.isRegistered(accelerator);
    const isRegisteredInWindow = false;

    BrowserWindow.getAllWindows().forEach((win) => {
        if (localShortcut.isRegistered(win, accelerator)) {
            isRegisteredInWindow = win;
            return false;
        }
    });

    if (isRegisteredInWindow) {
        return isRegisteredInWindow;
    } else if (isRegisteredInLocal) {
        return 'local';
    } else if (isRegisteredInGlobal) {
        return 'global';
    }

    return false;
}

function load(configs) {
    configs.forEach((config) => {
        register(config.type, config.accelerator, config.event);
    });
}

module.exports = {
    register,
    unregister,
    unregisterAll,
    isRegistered,
    load,
};
