'use strict';

const { ipcRenderer, remote } = require('electron');


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', function () {

    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('sum').value = '';

});

const btnSum = document.getElementById('btnSum');
btnSum.addEventListener('click', function () {

    const number1 = document.getElementById('number1');
    const number2 = document.getElementById('number2');

    const total = parseNumber(number1.value) + parseNumber(number2.value);
    const args = `${number1.value} + ${number2.value}: ${total}`;

    document.getElementById('sum').value = total;

    ipcRenderer.send("btnSum", args);
});

document.getElementById("btnClose").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow()
    window.close()
})

function parseNumber(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
}
