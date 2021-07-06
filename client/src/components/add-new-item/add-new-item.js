import React, {Component} from "react";

import './add-new-item.css'

const toast = require('toastr');

export default class AddNewItem extends Component {

    state = {
        label: ''
    }

    getItem = (e) => {
        if (e.target.value.length > 80) {
            toast.warning('You reached symbols limit for one todo.');
        } else {
            const label = e.target.value;
            this.setState({label})
        }

    }

    addItem = (e) => {
        e.preventDefault();

        if (this.state.label.length === 0) {
            toast.error('Please type your TODO first.')
        } else {
            this.props.onAddItem(this.state.label);
            this.setState({label: ''});
        }
    }

    render() {

        const { label } = this.state;


        return (
            <form
                className="add-new-item d-flex"
                onSubmit={this.addItem}>
                <input
                    type="text"
                    className="form-control inp"
                    placeholder="What needs to be done?"
                    value={label}
                    onChange={this.getItem}/>
                <button className="btn btn-outline-secondary">Add Item</button>
            </form>
        )
    }


}
