const os = require('os')
const fs = require('fs')
const readline = require('readline');

//Read file line by line
let lines = [], 
    keyValue, 
    newLine={},
    allPackages = [],
    packageNamesArray = [],
    packageObj = {},
    eachPackage, 
    fileName = './status.real';

//Reads file line by line

let createFileReadingInterface = (fileName)=>{
    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity  
    });
}

createFileReadingInterface();
//Returned lines
   
let findPackageNameFromReadLine = (createFileReadingInterface)=>{
    rl.on('line', (line) => {
        indexOfColonForKeys = line.indexOf(':');
        //For displaying content in key : value form
        if(line.length === 0){
            newLine = {
               key : "",
               value : "",
            };
            newLine.str = "";
        } else if(line.length > 0 && line.indexOf(':')<0){
            newLine = {
                key : "",
                value : line
            }
            newLine.str = newLine.value;
        }else{
                    newLine = {
                        key :  line.slice(0, indexOfColonForKeys),
                        value : line.slice(indexOfColonForKeys+1, line.length)                
                    };
                    newLine.str = newLine.key + ":" + newLine.value
        }
              lines.push(newLine);
    });    
}

module.exports = {

    
}