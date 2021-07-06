import React, {Component} from "react";

export default class ItemStatusFilter extends Component {

    render() {

        const { updateFilter, filter } = this.props;

        const btns = [
            { state: 'all', label: 'All' },
            { state: 'active', label: 'Active' },
            { state: 'done', label: 'Done' },
        ];

        const buttons = btns.map(({state, label}) => {
            const isActive = filter === state;
            const clazz = isActive ? 'btn btn-info' : 'btn btn-outline-secondary'

            return (
                <button
                    key={state}
                    type="button"
                    className={clazz}
                    onClick={() => updateFilter(state)}>{label}</button>
            );
        })

        return(
            <div className="btn-group">
                {buttons}
            </div>
        )
    }


}
