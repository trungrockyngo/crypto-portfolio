import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const searchResults = this.props.searchResults.map(
            curr => <li key={curr.id} data-id={curr.id} onClick={this.props.handleSelect} className="currency-list-item">
                <a href="#" className="currency">
                    <span>{curr.name}</span> <span>{curr.currency_symbol}</span> </a> </li>
        )

        return (
            <div>
                <h1> Cryptocurrency Porfolio calculator</h1>
                <form>
                    <div className="form-grp">
                        <label> Search for a currency: </label>
                        <input onChange={this.props.handleChange}
                            autoComplete="off" type="text" name="name" placeholder="Ex, Etherium, Bitcoin" value={this.props.name} className="field" />
                    </div>
                    <div className="currency-list">
                        {searchResults}
                    </div>
                </form>
            </div>
        )
    }
}

export default Search;