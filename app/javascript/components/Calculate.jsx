import React, { Component } from "react";

class Calculate extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>    
                <h1> How much {this.props.activeCurrency.name} do you own? </h1>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-grp">
                        <label> Enter the amount: </label>
                        <input onChange={this.props.handleChange}
                            autoComplete="off" type="text" name="amount" placeholder="How much?" value={this.props.name} className="field" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="calculate-btn" value="Calculate my total"/>
                    </div>
                </form>
                </div>
        )
    }
}

export default Calculate;