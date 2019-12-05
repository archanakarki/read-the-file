let typeOfOs = window.navigator.userAgent

//When the element of page are rendered
//This avoids returning null object on document.getElemnentBy... selectors
window.onload = ()=>{
    let welcomeMessage = document.getElementById('welcomeMessage')
    let messageAboutFile = document.getElementById('messageAboutFile')
    let viewSampleDataButton = document.getElementById('viewSampleDataButton')
    let sampleData = document.getElementById('sampleData')
    // let download = document.getElementById('download')

    if(typeOfOs.match(/Macintosh/g)){
        welcomeMessage.textContent = "MacOs is detected"
        messageAboutFile.style.display = "block"
    } else if(typeOfOs.match(/Linux/g)){
        welcomeMessage.textContent = "Linux is detected"
        messageAboutFileLinux.style.display = "block"
    } 
    //else if(typeOfOs.match(/Windows/g)){
    //     welcomeMessage.textContent = "Windows is detected"
    // }


}
