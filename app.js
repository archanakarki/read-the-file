//Built-in and third party modules used in app
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const readline = require('readline');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const PORT = process.env.PORT || 3000


//App configurations
app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'custom')));

//All app's logic

/* Meaning of variables in app.js
    data : single string returned by readFile, 'Package: libws-commons-util-java Status: install ok installed'
    splitdata : array returned by using split function in the data, [['Package:'], ['libws-commons-util-java'], ['Status:'], ['install'], ['ok']]
    packageIndex : arr of index numbers in splidata arr where the word Package stays to find the starting point of every package, [0, 56, 102]
    allPackages : Large obj that includes allPackage's details, [name, {name : Package, startsAt : 0, ...}]
    packageNames : arr that contains only package Names and no other details,  ['libws-commons-util-java', 'ibaspectj-java']
    pkgName : name of package ['libws-commons-util-java', 'ibaspectj-java']
    keys : array of terms like ['Package', 'Status', 'Priority]
    values : array of information about every keys, ['libws-commons-util-java', 'install', 'ok']
    allInfo : obj of details of one package, {'Package' : 'libws-commons-util-java'}
    keyIndex : arr of index position numbers of keys inside package [0, 2, 4,.....13]
    valueIndex : arr of index position numbers of values inside 1 pckage [1, 3, 5, 6,.....14]
    valArr : arr inside arr as if first key is at 0 index and second key is at 3 then index between them forms an arr , [[1, 2]]
    valStrArr : string formed from each elemnt of valArr, ['libws-commons-util-java', 'install ok installed', 'optional', 'java']
    lines : arr of lines by lines extracted files content as it is
*/

let data, splitData, packageIndex = [], allPackages = {}, packageNames = [];
data = fs.readFileSync('./status.real', 'utf-8')
splitData = data.split(/[\s\n\r]/g)
let keys = [], values = [], pkgName;
//Iterating over array of data seperated by whitespace, newline and carriage return (\s\n\r)
//From one Package word to another Package word keys will be title and values will be details of that keys
    splitData.forEach((e, i, thisArr)=>{
    //Condition used 1: Every title value has capital letter as initial char and : at its end so such word will be key and : is used to split as seperator
    if(e.match(/[A-Z]/g) && e.match(/[:]/g)){
    //Using word Package as start of every package
        if(e.match(/Package:/g)){
            e = e.replace(':', '').trimEnd()
            packageIndex.push(i);
            //Condition used 1.1: If word Package is at i its value will be at i+1 in the array
            //Similarly if key is at i then ':' will be seperator and afterwards ':' will be the value until next Key
            pkgName = thisArr[i+1];
            allPackages[pkgName] = {
                name : pkgName,
                startsAt : i,
                keys : [[i]],
                values: [],
                allInfo : {}
            }
        }  else if(!(e.match(/http/g) || e.match(/git/g) || e.match(/::/g) || e.match(/[0-9]/g))){
            //Condition used 2: Excluding ':' that follows http, git or numbers. It occurs in value and cannot be used as seperator
            allPackages[pkgName].keys.push([i])
        }} else{
        //Condition used 3: Array elements that does
        allPackages[pkgName].values.push([i])
        }
    })


    //Every allPackage obj comes with array of [name, obj]
    //packageName = This array can be used for displaying package names list
    //obj is extracted using Object.values(objName) for dislaying key value details
    Object.values(allPackages).forEach((onePack, i, thisArr)=>{
        //onePack is an array of name, details{}
        let packname = onePack.name
        packageNames.push(packname)

        // let packStartsAt = onePack.startsAt
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



    /* 
    Read file and to display text from file line by line as it is without any modification 
    Simpler approach to display all data in one page rather than iterating over all package results
    */

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
        key : line.slice(0, indexOfColonForKeys),
        value : line.slice(indexOfColonForKeys+1, line.length)
        };
        newLine.str = newLine.key + ":" + newLine.value
        }
        lines.push(newLine);
    });



//Routes
/* Homepage page */
app.get('/', (req, res)=>{
        res.render('welcome', {data: data, lines : lines})
});

/* Displays all data from file */
app.get('/data', (req, res)=>{
    res.render('data',{lines : lines})
})

/* Displays all packages name */
app.get('/index', (req, res)=>{
    for (let key in packInfo) {
        keys.push(key)
        values.push(packInfo[key])
       }
    res.render('index', {packageNames : packageNames.sort()})
})

/* Detects if status file exists */
app.get('/locateSys', (req, res)=>{
    let directory, dirBuf, files, status, error;
    try{
        directory = path.dirname('/var/lib/dpkg/status/')
        dirBuf = Buffer.from(directory)
        files = fs.readdirSync(dirBuf, 'utf8')
        for(let i = 0; i < files.length; i++){
            if(files[i] === 'status' && !(files[i] === 'status-old')){
                 status = files[i]
                 data = fs.readFileSync(path.join(directory, status), 'utf8')
                 res.redirect('/index')
            } 
        }
    } catch(e){
        res.render('locate', {error : e})
    }
})


/* Show individual package page */
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
