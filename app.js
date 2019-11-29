//Built-in and third party modules used in app
const express = require('express')
const app = express()

//App configurations
app.set('view engine', 'ejs')
const typeOfOS = os.type();


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

// let packagePara = [], finalPackage, finalValue, indexInsideOnePackageArr= [], finalValueStr = "", onePackageInString, package, oneLine, onePLength, index, onePackage, allPackages = [], currentPackageIndex, nextPackageIndex, splitData, newEachPackage = {}, mapSplitData, packageIndexNo = [], lengthOfPackageWord;
let data, splitData, packageIndexNo = [], onePackageInString,
	finalPackage = {
        position : undefined,
        indexes : undefined,
        packageName : undefined,
        details : {}
    }, currentPackageIndex, nextPackageIndex, indexInsideOnePackageArr = [], finalPackKeys = [], finalPackValues = [], slicedArr = [], valuesStrArr = [];


app.get('/packages', (req, res)=>{

    data = fs.readFileSync('./status.real', 'utf-8') 
    splitData = data.split(/[\s\n\r]/g)
    //Create array of package in splitted data arr
    splitData.forEach((e, i, thisArr)=>{
        if((e === "Package"  || e === "Package:") && (thisArr[i+2] === "Status:")){
        packageIndexNo.push(i);
        }
    })
    
    //Start package Obj from packageIndexNo arr, 
    //create arr from package to package
    for(let i = 0; i < packageIndexNo.length; i++){
    currentPackageIndex = packageIndexNo[i]
    nextPackageIndex = packageIndexNo[i+1]
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
    console.log(finalPackage)
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