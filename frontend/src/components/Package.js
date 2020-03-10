import React from 'react'
import './css/Package.css'

const Package = ({name, onClick}) => {    
    return(
        <>
          <p onClick={onClick}> <a href="!#">{name}</a> </p>
        </>
    )
}


export default Package