const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// DOM elements
var btnAppend = document.getElementById('btnCreate'); 
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

//Create button
btnCreate.addEventListener('click', function(){

    // CreatE text file
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err){
        if(err){
            return console.log(err);
        }
        var txtfile = document.getElementById("fileName").value;
        alert(txtfile + " text file was created");
        console.log("The file was created");
    });
});

//Read button
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, 'utf8', function(err, data) { 
        if (err) {
            console.error(err);
            return console.log(err);
        }
        fileContents.value = data;

        const lines = data.split('\n');
        const tableBody = document.getElementById('fileTableBody');
        tableBody.innerHTML = '';

        lines.forEach(function(line) {
            addContentToTable(line);
        });

        console.log("File has been Read!");
    });
});

//Update button
btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value; 

    fs.writeFile(file, contents, function (err) { 
        if (err) {
            return console.log(err);
        }
        var txtfile = document.getElementById("fileName").value;
        console.log("The file was updated!");
        alert(txtfile + " text file was updated");
    });
});

//Delete button
btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    
    fs.unlink(file, function(err){
        if(err){
            return console.log(err);
        }
        fileName.value = "";
        fileContents.value = "";
        console.log("The file was deleted!");
    });
});

//add content to the table
function addContentToTable(content) {
    const newRow = document.createElement('tr');

    const contentCell = document.createElement('td');
    contentCell.textContent = content;

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function() {
        const row = this.parentNode.parentNode; 
        const rowIndex = row.rowIndex;
        
        row.remove();

        const file = path.join(pathName, fileName.value);
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return console.log(err);
            }
            const lines = data.split('\n');
            lines.splice(rowIndex - 1, 1); 
            const updatedData = lines.join('\n');
            fs.writeFile(file, updatedData, 'utf8', function(err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    });

    deleteCell.appendChild(deleteButton);

    newRow.appendChild(contentCell);
    newRow.appendChild(deleteCell);

    const tableBody = document.getElementById('fileTableBody');
    tableBody.appendChild(newRow);
}
