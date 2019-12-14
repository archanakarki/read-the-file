let typeOfOs = window.navigator.userAgent

//When the element of page are rendered
//This avoids returning null object on document.getElemnentBy... selectors
window.onload = ()=>{
    let welcomeMessage = document.getElementById('welcomeMessage')
    let messageAboutFile = document.getElementById('messageAboutFile')
    let viewSampleDataButton = document.getElementById('viewSampleDataButton')
    let sampleData = document.getElementById('sampleData')
    // let download = document.getElementById('download')

    if(typeOfOs.match(/Macintosh/g) || typeOfOs.match(/Windows/g)){
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

