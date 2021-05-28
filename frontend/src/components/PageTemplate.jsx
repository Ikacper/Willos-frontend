import React from 'react'
import Navbar from './Navbar/Navbar'

function PageTemplate(props) {
    return (
        <>
            <Navbar />
            { props.children }
        </>
    )
}

export default PageTemplate
