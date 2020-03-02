const fs = require('fs');
let data,
  splitData,
  packageIndex = [],
  allPackages = {},
  packageNames = [];
data = fs.readFileSync('./status.real', 'utf-8');

splitData = data.split(/[\s\n\r]/g);
let keys = [],
  values = [],
  pkgName;
//Iterating over array of data seperated by whitespace, newline and carriage return (\s\n\r)
//From one Package word to another Package word keys will be title and values will be details of that keys
splitData.forEach((e, i, thisArr) => {
  //Condition used 1: Every title value has capital letter as initial char and : at its end so such word will be key and : is used to split as seperator
  if (e.match(/[A-Z]/g) && e.match(/[:]/g)) {
    //Using word Package as start of every package
    if (e.match(/Package:/g)) {
      e = e.replace(':', '').trimEnd();
      packageIndex.push(i);
      //Condition used 1.1: If word Package is at i its value will be at i+1 in the array
      //Similarly if key is at i then ':' will be seperator and afterwards ':' will be the value until next Key
      pkgName = thisArr[i + 1];
      allPackages[pkgName] = {
        name: pkgName,
        startsAt: i,
        keys: [[i]],
        values: [],
        allInfo: {}
      };
    } else if (
      !(
        e.match(/http/g) ||
        e.match(/git/g) ||
        e.match(/::/g) ||
        e.match(/[0-9]/g)
      )
    ) {
      //Condition used 2: Excluding ':' that follows http, git or numbers. It occurs in value and cannot be used as seperator
      allPackages[pkgName].keys.push([i]);
    }
  } else {
    //Condition used 3: Array elements that does
    allPackages[pkgName].values.push([i]);
  }
});

//Every allPackage obj comes with array of [name, obj]
//packageName = This array can be used for displaying package names list
//obj is extracted using Object.values(objName) for dislaying key value details
Object.values(allPackages).forEach((onePack, i, thisArr) => {
  //onePack is an array of name, details{}
  let packname = onePack.name;
  packageNames.push(packname);

  // let packStartsAt = onePack.startsAt
  let keyIndex = onePack.keys;
  let valueIndex = onePack.values;
  let currentKeyIndex;
  let nextKeyIndex;
  let valArr = [];
  valStrArr = [];
  let keyIndexLength = keyIndex.length;
  let valueIndexLength = valueIndex.length;
  let info = {};

  for (let i = 0; i < keyIndexLength; i++) {
    if (i < keyIndexLength - 1) {
      currentKeyIndex = Number(keyIndex[i]);
      nextKeyIndex = Number(keyIndex[i + 1]);
    } else if (i == keyIndexLength) {
      nextKeyIndex = valueIndex[valueIndexLength];
    }
    valArr.push(splitData.slice(currentKeyIndex + 1, nextKeyIndex));
  }

  valArr.forEach((val, i, arr) => {
    let str = '';
    val.forEach(v => {
      return (str = str + v + ' ');
    });
    valStrArr.push(str);
  });

  keyIndex.forEach((key, i) => (info[splitData[key]] = valStrArr[i]));
  allPackages[packname].allInfo = info;
});

module.exports = {
  data: data,
  dataToSingleString: splitData,
  allPackages: {
    "packages" : [{...allPackages}]
  }
};
