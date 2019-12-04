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
        welcomeMessage.textContent = "MacOs detected"
        messageAboutFile.style.display = "block"
    } else if(typeOfOs.match(/Linux/g)){
        welcomeMessage.textContent = "Linux detected"
    } else if(typeOfOs.match(/Windows/g)){
        welcomeMessage.textContent = "Windows detected"
    }



//Displays all data on click
viewSampleDataButton.addEventListener('click', (event)=>{
    if(sampleData.style.display == "none"){
        viewSampleDataButton.style.backgroundColor = "#4da6ff"
        sampleData.style.display = "block"
        viewSampleDataButton.textContent = "Hide sample data"
    } else{
        viewSampleDataButton.style.backgroundColor = "#4D4D4D"
        sampleData.style.display = "none"
        viewSampleDataButton.value = "View sample data"
    }
})

}
