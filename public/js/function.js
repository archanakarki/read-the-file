/*
In this file : 
window.navigator.useragent : detects operating system of the file
typeOfOS : is used to handle button and displaying/hiding block of buttons
*/

let typeOfOs = window.navigator.userAgent
window.onload = ()=>{
    /*
    Executes when the element of page are rendered
    This avoids returning null object on document.getElemnentBy... selectors 
    */
    let welcomeMessage = document.getElementById('welcomeMessage')
    let messageAboutFile = document.getElementById('messageAboutFile')
    let viewSampleDataButton = document.getElementById('viewSampleDataButton')
    let sampleData = document.getElementById('sampleData')

    /*
    Displays buttons and div based on the detected os from the browser
    */
    if(typeOfOs.match(/Macintosh/g)){
        welcomeMessage.textContent =  "Mac OS is detected."
        messageAboutFile.style.display = "block"
    } else if(typeOfOs.match(/Windows/g)){
        welcomeMessage.textContent = " Windows OS is detected."
        messageAboutFile.style.display = "block"
    } else if(typeOfOs.match(/Linux/g)){
        welcomeMessage.textContent = "Linux OS is detected."
        messageAboutFileLinux.style.display = "block"
    } else{
        welcomeMessage.textContent =  typeOfOs + " is detected."
        messageAboutFile.style.display = "block"
    }
}

