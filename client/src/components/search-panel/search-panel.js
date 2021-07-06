import React, {Component} from "react";

import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
        term: ''
    }


    onChangeTerm = (e) => {
        const term = e.target.value;
        this.setState({term})

        return this.props.onSearch(term);
    }


    render() {

        const { term } = this.state;

        return(
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="type to search"
                    onChange={this.onChangeTerm}
                    value={term}/>
        )
    }


}
