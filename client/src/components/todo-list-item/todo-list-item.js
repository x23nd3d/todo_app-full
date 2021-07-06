import React, {Component} from "react";

import './todo-list-item.css'

export default class TodoListItem extends Component {


    render() {

        const {
            label,
            onToggleDone,
            done,
            important,
            onToggleImportant,
            onRemove
        } = this.props;

        let clazz = 'todo-list-item';

        if (done) {
            clazz += ' done'
        }

        if (important) {
            clazz += ' important'
        }

        return(
            <span className={clazz}>
                <span className="todo-list-item-label"
                       onClick={onToggleDone}>{label}</span>
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={onToggleImportant}>
                    <i className="fa fa-exclamation"></i>
                </button>
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onRemove}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </span>

        )
    }


}
