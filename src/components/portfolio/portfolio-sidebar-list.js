import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loadingImage from "../../../static/assets/images/loading/loading1.gif"

export default function(props) {
  const portfolioList = props.portfolioApiData.map(item => {
    return (
      <div key={item.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={item.thumb_image_url} />
        </div>
        <div className="portfolio-thumb-text">
          <h1 className="title">{item.name}</h1>
          <div className="actions">
          <a className="action-icon" onClick={() => props.handleEditClick(item)}><FontAwesomeIcon icon="edit" /></a>
          <a className="action-icon" onClick={() => props.handleDeleteClick(item)}><FontAwesomeIcon icon="trash" /></a>
          </div>
        </div>
      </div>
    )
  })

  if (props.portfolioApiData.length === 0) {
    return <div style={{backgroundImage: `url(${loadingImage})`}} />
  } else {
    return (
      <div className="portfolio-sidebar-list-wrapper">
        {portfolioList.reverse()}
      </div>
    )
  }
}