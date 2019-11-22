import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import ContactPagePic from "../../../static/assets/images/auth/login.jpg"


const Contact = () => {
  return (
    <div className='content-page-wrapper'>
      <div className='content-image'
        alt="portfolio-about-picture"
        style={{
          background: `url(${ContactPagePic}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className='content-text'>
        <h1>Parker Stone</h1>
        <div className='contact-bullet-points'>
          <p><FontAwesomeIcon icon='phone-alt' className='icon' /> 555-555-5555</p>
          <p><FontAwesomeIcon icon='envelope' className='icon' /> fake@email.com</p>
          <p><FontAwesomeIcon icon='map-marker-alt' className='icon' /> 123 S Fake Street</p>
        </div>
      </div>
    </div>
  )
}

export default Contact