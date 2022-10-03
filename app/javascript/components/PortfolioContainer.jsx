import React, { Component } from "react"
import Calculate from "./Calculate"
import Search from "./Search"
import Portfolio from "./Portfolio"
import axios from 'axios'


class PortfolioContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            portfolio: [],
            searchResults: [],
            activeCurrency: null,
            amount: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleAmount = this.handleAmount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange = async (evt) => {
        // this.setState({
        //     [evt.target.name]: evt.target.value
        // })

        try {
            const response = await axios.post('/search', {
                search: evt.target.value
            })

            this.setState({
                searchResults: [...response.data.currencies]
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    handleSelect = (evt) => {
        evt.preventDefault()

        const selectedId = evt.target.getAttribute('data-id')
        const activeCurrency = this.state.searchResults.filter(item => item.id == parseInt(selectedId))
        this.setState({
            activeCurrency: activeCurrency[0],
            searchResults: []
        })
    }



    handleSubmit = async (evt) => {
        evt.preventDefault()

        let currency = this.state.activeCurrency
        let amount = this.state.amount

        try {

            const response = await axios.post('/calculate', {
                id: currency.id,
                amount: amount
            })
            // debugger
            console.log(response)

            this.setState({
                amount: '',
                activeCurrency: null,
                portfolio: [... this.state.portfolio, response.data]
            })
        }
        catch (err) {
            // debugger
            console.log(err)
        }
    }

    handleAmount = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        const searchOrCalculate = this.state.activeCurrency ?
            <Calculate
                handleChange={this.handleAmount}
                handleSubmit={this.handleSubmit}
                activeCurrency={this.state.activeCurrency}
                amount={this.state.amount}
            />
            :
            <Search
                searchResults={this.state.searchResults}
                handleChange={this.handleChange}
                handleSelect={this.handleSelect} />


        return (
            <div className="grid">
                <div className="left">
                    {searchOrCalculate}
                </div>
                <div className="right">
                    <Portfolio portfolio={this.state.portfolio} />
                </div>
            </div>
        )
    }
}

export default PortfolioContainer; 