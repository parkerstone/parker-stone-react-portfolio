import React from 'react';
import PortfolioContainer from "../portfolio/portfolio-container";

export default function(props) {
  return (
    <div>
      <PortfolioContainer portfolioApiData={props.portfolioApiData}/>
    </div>
  )
}