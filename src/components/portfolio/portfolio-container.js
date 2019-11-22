import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item"

export default class PortfolioContainer extends Component {
  constructor() {
    super();
    
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      portfolioApiData: []
    }

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.setState({
        portfolioApiData: this.state.originalData
      })
    } else {
      this.setState({
        portfolioApiData: this.state.originalData.filter(item => {
          return item.category === filter;
        })
      })
    }
  }

  getPortfolioItems(filter = null) {
    axios.get('https://parkerstone.devcamp.space/portfolio/portfolio_items') //to reverse order: '?order_by=created_at&direction=desc'
    .then(res => {
      this.setState({
        portfolioApiData: res.data.portfolio_items,
        originalData: res.data.portfolio_items
      })
    })
    .catch(err => {
      console.log("There was an error getting the portfolio items from the API. ", err);
    })
  }

  componentDidMount() {
    this.getPortfolioItems()
  }


  portfolioItems() {
    return this.state.portfolioApiData.map(item => {
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
        <div className="filter-liks">
          <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
          <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
          <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
          <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>
        </div>
        <div className="portfolio-items-wrapper">
          {this.portfolioItems()}
        </div>
      </div>
    )
  }
}