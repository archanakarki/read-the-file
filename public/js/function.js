//When the element of page are rendered
//This avoids returning null object on document.getElemnentBy... selectors
window.onload = ()=>{
    let typeOfOs = document.getElementById('welcomeMessage').textContent
    let messageAboutFile = document.getElementById('messageAboutFile')
    let viewSampleDataButton = document.getElementById('viewSampleDataButton')
    let sampleData = document.getElementById('sampleData')
    // let download = document.getElementById('download')

    if(typeOfOs.match(/MacOs/g)){
        messageAboutFile.style.display = "block"
    } else if(typeOfOs.match(/Linux/g)){
        messageAboutFileLinux.style.display = "block"
    } else if(typeOfOs.match(/Windows/g)){
        messageAboutFile.style.display = "block"
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
