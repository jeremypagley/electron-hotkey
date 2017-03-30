# electron-hotkey

Manage shortcuts in Electron.

You can use it in main or renderer process.

## Usage

```javascript
npm install --save electron-hotkey

// in main process
const hotkey = require('electron-hotkey');

// in renderer process
const hotkey = require('electron').remote.require('electron-hotkey');
```

**register(typeOrWindow, accelerator, eventName)**

typeOrWindow: 'global', 'local' or a window instance.

```javascript
hotkey.register('global', 'CommandOrControl+1', 'event-1');
hotkey.register('local', 'CommandOrControl+2', 'event-2');
hotkey.register(myWindow, 'CommandOrControl+3', 'event-3');

app.on('shortcut-pressed', (event) => {
    console.log(event);
});
```

**unregister(accelerator)**

**unregisterAll()**

**isRegistered(accelerator)**

Return value could be false, 'global', 'local', or a window instance.

**load(config)**

A config example could be:

```javascript
const config = [
    {type: 'global', accelerator: 'CommandOrControl+1', event: 'event-1'},
    {type: 'local', accelerator: 'CommandOrControl+2', event: 'event-2'},
    {type: myWindow, accelerator: 'CommandOrControl+3', event: 'event-3'},
];
```