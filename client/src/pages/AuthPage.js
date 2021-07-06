import React, {Component} from "react";
import LoginPanel from "../components/login-panel";

export default class AuthPage extends Component{
    constructor() {
        super();

        this.state = {
            loginPageActive: true
        }

        this.toggleLoginPage = () => {
            // TODO: add ajax check if you are logged in now.
            // if (localStorage.getItem('loginForm') === "false") {
            //     this.setState(({loginPageActive, connected}) => {
            //         return {
            //             loginPageActive: !loginPageActive,
            //             connected: !connected
            //         }
            //     })
            // }
            console.log(this.props, 'PROPS')
            if (this.props.connected === false) {
                this.setState(({loginPageActive}) => {
                    return {
                        loginPageActive: true
                    }
                })
            }
        }

    }

    componentDidMount() {
        // TODO: use another method as this one was deprecated
        // before the component was rendered
        this.toggleLoginPage();

    }


    render() {

        const { loginPageActive } = this.state;

        const overlay = loginPageActive ? <div className="overlay"></div> : null
        const loginForm = loginPageActive ? <LoginPanel connection={this.toggleLoginPage}/> : null

        return (
            <React.Fragment>
                {overlay}
                {loginForm}
            </React.Fragment>
        )
    }


}

