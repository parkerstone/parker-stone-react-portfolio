import React, { Component } from "react";

import PortfolioItem from "./portfolio-item"

export default class PortfolioContainer extends Component {
  constructor() {
    super();
    
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false
    }

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    })
  }


  portfolioItems() {
    return this.props.portfolioApiData.map(item => {
      return (
      <PortfolioItem 
        key={item.id}
        item={item}
      />);
    })
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }
    
    return (
      <div className="portfolio-wrapper">
        <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
        <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
        <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
        <div className="portfolio-items-wrapper">
          {this.portfolioItems()}
        </div>
      </div>
    )
  }
}