import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item"

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []
        }

        this.handleFilter = this.handleFilter.bind(this)
    }


    getPortfolioItems() {
        axios.get('https://parkerstone.devcamp.space/portfolio/portfolio_items')
        .then(res => {
            this.setState({
                data: res.data.portfolio_items
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }


    portfolioItems() {
        return this.state.data.map(item => {
            console.log("item data", item)
            return <PortfolioItem key={item.id} title={item.name} url={item.url} slug={item.id} />;
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>

                {this.portfolioItems()}

                {/* <hr/>
                <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}

            </div>
        )
    }
}