import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import LoginPanel from "../login-panel";
import TodoService from "../../services/todoService";

import './app.css'
import {useRoutes} from "../../routes";
import AuthPage from "../../pages/AuthPage";
import {Dashboard} from "../../pages/Dashboard";

const toastr = require('toastr');
const token = sessionStorage.getItem('API');
let isAuthenticated = !!token

let routes = useRoutes(isAuthenticated);


// TODO: ADD REACT ROUTER, ADD METHODS WITH TODOS + ADD DATE OF ANY TODO AND MORE FEATURES

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loginPageActive: false,
            connected: false
        }



        this.todoService = new TodoService();


        this.toggleLoginPage = () => {
            // TODO: add ajax check if you are logged in now.
            this.setState({loginPageActive: true})
        }

        this.logOut = () => {
            sessionStorage.clear();
            localStorage.clear();
            this.setState(({loginPageActive}) => {
                return {
                    loginPageActive: !loginPageActive
                }
            });
            window.location = '/auth'
        };

        this.checkRoute = () => {
            if (this.state.loginPageActive === true ) {
                console.log(this.state.loginPageActive, 'STATE');
                window.location = '/auth'
            } else {
                // TODO: then will add routes
                window.location = '/dashboard'
            }
        }

        this.checkIfConnected = () => {
            const checking = setInterval(() => {
                this.todoService.checkIfAuth().then(body => {
                    const { status } = body;

                    if (status === "connected") {
                        // this.setState({connected: true});
                        // clearInterval(checking);
                        // console.log('TRUE')
                    } else {
                        this.setState({connected: false});
                        // console.log('FALSE')
                        sessionStorage.removeItem('API');
                        isAuthenticated = false;
                        this.setState({loginPageActive: false})
                        toastr.warning('Your session was expired, please log in.')
                        // localStorage.removeItem('loginForm')
                        clearInterval(checking);
                    }
                })
            }, 5000)
        }


    }


    componentDidMount() {
        // after rendering
        // this.checkRoute();

        if (token) {
            this.toggleLoginPage();
            this.setState({connected: true})
            this.checkIfConnected();
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.connected !== this.state.connected) {
            console.log(this.state.connected, 'STATESSS');
                console.log('CAMGEEEEEEEEEEEEEEEEEEEEEEEEEEED');
                routes =
                    <Router>
                        <Switch>
                            <Route path="/auth" exact>
                                <AuthPage connected={this.state.connected}/>
                            </Route>
                            <Redirect to="/auth"/>
                        </Switch>
                    </Router>


        }
    }



    render() {

        const { loginPageActive, connected } = this.state;

        console.log(connected, 'CONNECTED');
        console.log(loginPageActive, 'TOGGLE')


        const logout = loginPageActive ? <LogOut status={this.logOut}/> : null;


        return (
            <Router>
                <div className="todo-app">
                    {logout}
                    {routes}
                </div>
            </Router>

        )
    }


};


const LogOut = ({ status }) => {
    return (
        <form action="#" onSubmit={ status }>
            <button className="btn btn-secondary logout">Log out</button>
        </form>
    )
}

