import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFiler from '../item-status-filter';
import AddNewItem from "../add-new-item";
import TodoService from "../../services/todoService";
import Spinner from "../spinner";

import './todo-app.css'

// TODO: ADD REACT ROUTER, ADD METHODS WITH TODOS + ADD DATE OF ANY TODO AND MORE FEATURES

export default class TodoApp extends Component {
    constructor() {
        super();

        const toastr = require('toastr');

        this.todoService = new TodoService();

        this.state = {
            todoData: [],
            term: '',
            filter: 'all',
        }


        this.getData = () => {
            this.todoService.getItems().then(body => {
                const todoData = body.todos;
                if (todoData) {
                    this.setState({todoData});
                } else {
                    console.log(todoData, 'no TodoData')
                }

            })
        }

        this.toggleProperty = (array, id, prop) => {
            const idx = array.findIndex(item => item._id === id);
            const oldItem = array[idx];
            const newItem = {
                ...oldItem,
                [prop]: !oldItem[prop]
            };

            const updatedArray = [
                ...array.slice(0, idx),
                newItem,
                ...array.slice(idx + 1)
            ];

            this.todoService.refreshProperty(id, prop);


            return updatedArray;


        };

        this.onToggleDone = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            });
        };

        this.onToggleImportant = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            });
        };

        this.removeItem = (id) => {
            console.log(id, 'ID')
            this.todoService.removeItem(id).then(body => {
                const todoData = body.todos;
                if (todoData) {
                    this.setState({todoData});
                } else {
                    console.log(todoData, 'no TodoData')
                }
            })
            // this.setState(({todoData}) => {
            //     const idx = todoData.findIndex(item => item.id === id);
            //     const newItem = [
            //         ...todoData.slice(0, idx),
            //         ...todoData.slice(idx + 1)
            //     ];
            //
            //     return {
            //         todoData: newItem
            //     }
            // });
        };

        this.search = (term, array) => {

            if (!term) {
                return array
            }

            return array.filter(item => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
            });
        };

        this.updateTerm = (term) => {
            this.setState({term})
        };

        this.addItem = (label) => {
            const newItem = this.createTodo(label);
            this.todoService.addItem(newItem).then(body => {
                // TODO: check why multiple items added + correct state, state todoData should get all items every time
                    const todoData = body.todos;
                console.log(body, 'DATA FROM SERVER');
                this.setState({todoData});
                    //
                    // const newItems = [
                    //     ...todoData,
                    //     newItem
                    // ];
                    //
                    // return {
                    //     todoData: newItems
                    // }

                })


            // this.setState(({todoData}) => {
            // });
        };

        this.filter = (state, items) => {
            switch (state) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter(item => !item.done);
                case 'done':
                    return items.filter(item => item.done);
                default:
                    return items;
            }

        };

        this.updateFilter = (filter) => {
            this.setState({filter})
        };


    }



    createTodo(label) {
        return {
            label,
            done: false,
            important: false,
        }
    }

    componentWillMount() {
        // TODO: use another method as this one was deprecated
        // before the component was rendered
        this.getData()

    }

    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(filter, this.search(term, todoData));

        const doneItems = todoData.filter(item => item.done).length;
        const todoItems = todoData.length - doneItems;

        const hasData = todoData.length > 0 ? true : null;
        const todos =  hasData ? <TodoList todos={visibleItems} toggleDone={this.onToggleDone} toggleImportant={this.onToggleImportant} onRemove={this.removeItem}/> : <Spinner/>;

        return (
            <div className="todo-app">
                {/*<LogOut status={this.logOut}/>*/}
                <AppHeader todo={todoItems} done={doneItems}/>
                <div className="top-panel d-flex">
                <SearchPanel onSearch={this.updateTerm}/>
                <ItemStatusFiler
                    updateFilter={this.updateFilter}
                    filter={filter}/>
                </div>
                {todos}
                <AddNewItem onAddItem={this.addItem}/>
            </div>
        )
    }


};

