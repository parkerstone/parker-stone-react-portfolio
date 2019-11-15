import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default function(props) {
  const [portfolioToEdit, setPortfolioToEdit] = useState({})

  const handleSuccessfulFormSubmission = () => {
    props.getPortfolioItems()
  }

  const handleFormSubmissionError = error => {
    console.log("handleFormSubmissionError error", error)
  }

  const handleDeleteClick = item => {
    axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${item.id}`,
      {withCredentials: true})
      .then(res => {
        props.getPortfolioItems()
        return res.data
      })
      .catch(err => {
        console.log("handleDeleteClick error: ", err)
      })
  }

  const handleEditClick = item => {
    setPortfolioToEdit(item)
  }

  const clearPortfolioToEdit = () => {
    setPortfolioToEdit({})
  }

  return (
    <div className='portfolio-manager-wrapper'>
      <div className="left-column">
        <PortfolioForm 
          handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
          handleFormSubmissionError={handleFormSubmissionError}
          clearPortfolioToEdit={clearPortfolioToEdit}
          portfolioToEdit={portfolioToEdit}
        />
      </div>
      <div className="right-column">
        <PortfolioSidebarList 
          portfolioApiData={props.portfolioApiData}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}