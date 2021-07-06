import React from "react";

import './app-header.css'

const AppHeader = ({todo, done}) => {

    const statusInfo = <h2>{todo} more to do, {done} done</h2>;

    return (
        <div className="app-header d-flex">
            <h1>Todo List</h1>
            {statusInfo}
        </div>
    )
}

export default AppHeader;