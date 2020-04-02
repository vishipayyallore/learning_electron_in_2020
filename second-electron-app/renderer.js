'use strict';

const ipcRenderer = require('electron').ipcRenderer; 

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const btnSum = document.getElementById('btnSum');
btnSum.addEventListener('click', function(){

    const number1 = document.getElementById('number1');
    const number2 = document.getElementById('number2');

    ipcRenderer.send("btnSum", number2.value);
});