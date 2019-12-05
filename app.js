//Built-in and third party modules used in app
const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs')
const path = require('path')
const readline = require('readline');
const PORT = process.env.PORT || 3000
//App configurations
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));


/* Package Description */

let data, splitData, packageIndex = [], allPackages = {}, packageNames = [];
data = fs.readFileSync('./status.real', 'utf-8') 
    splitData = data.split(/[\s\n\r]/g)
    //Create array of package in splitted data arr
    let keys = [], values = [], pkgName; 
    splitData.forEach((e, i, thisArr)=>{
            
            if(e.match(/[A-Z]/g) && e.match(/[:]/g)){

                if(e.match(/Package:/g)){    
                    e = e.replace(':', '').trimEnd()
                    packageIndex.push(i);
                    pkgName = thisArr[i+1];
                    allPackages[pkgName] = {
                        name : pkgName,
                        startsAt : i,
                        keys : [[i]],
                        values: [],
                        allInfo : {
                            // [e] : i
                        }
                    }
                } else if(!(e.match(/http/g) || e.match(/git/g) || e.match(/::/g) || e.match(/[0-9]/g))){
                    allPackages[pkgName].keys.push([i])
                }    
            } 
            else{
                allPackages[pkgName].values.push([i])
            }
    })
   
    Object.values(allPackages).forEach((onePack, i, thisArr)=>{
    //Received Onepack is an array of name, details{}
        let packname = onePack.name
        packageNames.push(packname)
        let packStartsAt = onePack.startsAt
        let keyIndex = onePack.keys
        let valueIndex = onePack.values
        let currentKeyIndex;
        let nextKeyIndex;
        let valArr = []
            valStrArr = [];
        let keyIndexLength = keyIndex.length
        let valueIndexLength = valueIndex.length
        let info = {}
        for(let i = 0; i < keyIndexLength; i++){
           
            if(i < keyIndexLength-1){
                currentKeyIndex = Number(keyIndex[i])
                nextKeyIndex = Number(keyIndex[i+1])
             } else if(i == keyIndexLength){
                 nextKeyIndex = valueIndex[valueIndexLength]
             }
            valArr.push(splitData.slice(currentKeyIndex+1 , nextKeyIndex))
        }

        valArr.forEach((val, i, arr)=>{
            let str = ""
            val.forEach((v)=>{
                return str = str + v + " "
            })
            valStrArr.push(str)
        })
         keyIndex.forEach((key, i) => info[splitData[key]] = valStrArr[i]);
         allPackages[packname].allInfo = info
    })



/** Operating system */

/* Routes */ 

//Read file line by line
let lines = [], newLine={};
//Reads file line by line
let rl = readline.createInterface({
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
/* Index page */
app.get('/', (req, res)=>{
    // let typeOfOs = process.platform
  res.render('welcome', {data: data, lines : lines})

});

app.get('/data', (req, res)=>{
    res.render('data',{lines : lines})
})

app.get('/index', (req, res)=>{
    for (let key in packInfo) {
        keys.push(key)
        values.push(packInfo[key])
       }
    res.render('index', {packageNames : packageNames.sort()})
})

app.get('/locateSys', (req, res)=>{
    //let path = '/Users/archanakarki/Desktop/register/package-lock.json';
    let path1 = path.dirname('/var/lib/dpkg/status')
    let dir = fs.readdirSync(path1, 'utf-8')
    // path = path.dirname('/var/lib/dpkg/status')
    // let located = fs.readFileSync(path, 'utf-8')
    console.log(dir)
    res.render('locate')
})

/* Show package page */
let packInfo = {};
app.get('/:id', (req, res)=>{
    let keys = [], values = []
    const packageUrl = req.params.id;    
    Object.values(allPackages).forEach((pack)=>{
        if(pack.name === packageUrl){
            packInfo = pack.allInfo
        }
        return packInfo
    })

    for (let key in packInfo) {
       keys.push(key)
       values.push(packInfo[key])
      }
    
      res.render('show', {packageUrl : packageUrl, keys : keys, values: values, packageNames: packageNames.sort(), packInfo:packInfo})
})


//Ports for app
app.listen(PORT, ()=>{
    console.log("Server is listening to port " + PORT)
})
