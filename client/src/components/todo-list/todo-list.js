import React from "react";
import TodoListItem from '../todo-list-item';

import './todo-list.css';

const TodoList = ({
                      todos,
                      toggleDone,
                      toggleImportant,
                      onRemove
                    }) => {
    const elements = todos.map(item => {
       const { _id, ...restData } = item;

        return (
           <li key={_id} className="list-group-item">
               <TodoListItem
                   {...restData}
                    onToggleDone={() => toggleDone(_id)}
                    onToggleImportant={() => toggleImportant(_id)}
                    onRemove={() => onRemove(_id)}/>
           </li>
       )
   })


    return(
        <ul className="list-group todo-list">
            {elements}
        </ul>
    )
}

export default TodoList;