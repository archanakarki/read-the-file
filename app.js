//Built-in and third party modules used in app
const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs')
const readline = require('readline');
//App configurations
app.set('view engine', 'ejs')

//Read file line by line
let lines = [], 
    keyValue, 
    newLine={},
    allPackages = {},
    packageNamesArray = [],
    packageObj = {},
    eachPackage;
//Reads file line by line
    const rl = readline.createInterface({
        input: fs.createReadStream('./status.real'),
        crlfDelay: Infinity  
    });

//Returned lines   
    rl.on('line', (line) => {
        indexOfColonForKeys = line.indexOf(':');
        //For displaying content in key : value form
        if(line.length === 0){
            newLine = {
            key : "",
            value : "",
            };
            newLine.str = "";
        } else if((line.length > 0) && (line.indexOf(':')<0)){
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


//Routes
app.get('/', (req, res)=>{
    //Finding sorted package name
    lines.forEach((line)=>{
        if(line['key'].match(/Package/g)){
            let packageName = line.value
            packageNamesArray.push(packageName)
        }
    })
    packageNamesArray = packageNamesArray.sort()
    //Read File
    fs.readFile('./status.real', 'utf-8', (err, data)=>{
        if(err) throw err;
        res.render('index', {data : data, lines : lines, packageNamesArray : packageNamesArray})
        });
});

// let packagePara = [], finalPackage, finalValue, indexInsideOnePackageArr= [], finalValueStr = "", onePackageInString, package, oneLine, onePLength, index, onePackage, allPackages = [], currentPackageIndex, nextPackageIndex, splitData, newEachPackage = {}, mapSplitData, packageIndex = [], lengthOfPackageWord;
let data, splitData, packageIndex = [], onePackageInString,
	finalPackage = {
        name : undefined,
        position : undefined,
        indexes : undefined,
        details : {}
    }, currentPackageIndex, nextPackageIndex, indexInsideOnePackageArr = [], finalPackKeys = [], finalPackValues = [], slicedArr = [], valuesStrArr = [];


app.get('/packages', (req, res)=>{

    data = fs.readFileSync('./status.real', 'utf-8') 
    splitData = data.split(/[\s\n\r]/g)
    //Create array of package in splitted data arr
    let keys = [], values = [], pkgName; 
    splitData.forEach((e, i, thisArr)=>{
        //If any word includes : then 
            //Try matching if it is Package:
                //If not matched then 
            //Seacrh for the word Package:
            
            if(e.match(/[A-Z]/g) && e.match(/[:]/g)){

                if(e.match(/Package:/g)){    
                    e = e.replace(':', '').trimEnd()
                    packageIndex.push(i);
                    pkgName = thisArr[i+1];
                    allPackages[pkgName] = {
                        name : pkgName,
                        startsAt : i,
                        keys : [e],
                        values: [],
                        strArr: [],
                        allInfo : {}
                    }
                } else if(!(e.match(/http/g) || e.match(/git/g) || e.match(/::/g) || e.match(/[0-9]/g))){
                    //In case the index number is needed change keys : [e] to keys : [i] in allPackages defination
                    //and here => allPackages[pkgName].keys.push(e)
                    allPackages[pkgName].keys.push(e)
                }    
            } else{
                allPackages[pkgName].values.push(i)
            }
    })

    //To get all the package Names
//    for(let p in allPackages){
//     console.log(p)
//    }

    // console.log(Object.keys(allPackages).length)
    
    //Start package Obj from packageIndex arr, 
    //create arr from package to package
    for(let i = 0; i < packageIndex.length; i++){
    currentPackageIndex = packageIndex[i]
    nextPackageIndex = packageIndex[i+1]
    finalPackage.position = currentPackageIndex;
    finalPackage.packageName = splitData[currentPackageIndex+1]
    onePackageInString = splitData.slice(currentPackageIndex, nextPackageIndex)
    } 
    
    //Edit inside onePackage Arr
    for(let i = 0; i < onePackageInString.length; i++){
        if((onePackageInString[i].endsWith(':') || onePackageInString[i].endsWith(': '))&& !	(onePackageInString[i].includes('http:'))){
            indexInsideOnePackageArr.push(onePackageInString[i].trimEnd(), i);
        }
     }

    finalPackage.indexes = indexInsideOnePackageArr

    //Lets find value
    for(let i = 0; i<indexInsideOnePackageArr.length; i+=2){
        if(indexInsideOnePackageArr[i].endsWith(':') || indexInsideOnePackageArr[i].endsWith(': ')){
            finalPackKeys.push(indexInsideOnePackageArr[i].replace(':', ''))
        }
        finalPackValues.push(indexInsideOnePackageArr[i+1])
    } 
    
    for(let i = 0; i <finalPackValues.length; i++){
        // slicedArr.push(onePackageInString.slice(finalPackValues[i]+1, finalPackValues[i+1]))
        slicedArr.push(onePackageInString.slice(finalPackValues[i]+1, finalPackValues[i+1]))

    }

    for(let i = 0; i < slicedArr.length; i++){
        let str = "";
        for(let j = 0; j < slicedArr[i].length; j++){
        str = str + slicedArr[i][j] + " "
        }
        valuesStrArr[i] = str
    }

    finalPackKeys.forEach((key, i) => finalPackage.details[key] = valuesStrArr[i])  
    res.render('packages', {data:data, finalPackage : finalPackage})   
})


app.get('/:id', (req, res)=>{
    const packageUrl = req.params.id;
    res.render('show', {packageUrl : packageUrl, lines:lines, packageNamesArray : packageNamesArray})
})


//Ports for app
app.listen(3000, ()=>{
    console.log("Server is listening to port 3000")
})