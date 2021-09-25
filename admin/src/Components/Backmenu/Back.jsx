import React from 'react'
import './back.scss'
const Back = () => {
    const backmenu=()=>{
        if (window.scrollY) {
            window.scroll(0, 0);  // reset the scroll position to the top left of the document.
          }
          
    }
    return (
            <div className="back2" onClick={backmenu}>
            <i className="fas fa-arrow-alt-circle-up"></i>
            </div>
    )
}
export default Back
