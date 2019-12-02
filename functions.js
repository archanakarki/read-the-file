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