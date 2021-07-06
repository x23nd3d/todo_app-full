import React, {Component} from "react";
import '../../../node_modules/animate.css/animate.css';
import '../../services/todoService';

import './login-panel.css'
import TodoService from "../../services/todoService";
import {useRoutes} from "../../routes";
const toastr = require('toastr');

export default class LoginPanel extends Component {

    todoService = new TodoService();

    state = {
        active: true,
        singIn: false,
        register: {
            name: "",
            email: "",
            password: "",
            passwordRepeat: ""
        },
        login: {
            email: "",
            password: ""
        }
    }

        // activateModal = () => {
        //     this.setState(({active}) => {
        //         return {
        //             active: !active
        //         }
        //     })
        //
        //
        //
        //     div.addEventListener('click', e => {
        //         e.preventDefault();
        //         document.querySelector('.signup__container').classList.add('animate__animated')
        //         document.querySelector('.signup__container').classList.add('animate__backOutUp')
        //         setTimeout(() => {
        //             this.setState({active: false})
        //             div.remove();
        //         }, 800)
        //
        //
        //
        //     })
        // }

        changeMode = () => {
            this.setState(({singIn}) => {
                return {
                    singIn: !singIn
                }
            })
        }

        setValue = (e) => {

            const value = e.target.value;
            // TODO correct UNDEFINED AND MAKE AS 1 FUNCTION

            const obj = {
                ...this.state.register,
                [e.target.name]: value,
                [e.target.name]: value,
                [e.target.name]: value,
                [e.target.name]: value
            }

            this.setState(({register}) => ({
                register: obj
            }))

        }

        sendData = (e) => {
            e.preventDefault();
            window.location = '/#submit'

            const { password, passwordRepeat, email } = this.state.register;

            const areSame = password === passwordRepeat;

            if (areSame) {
                if (!email.includes('@') || !email.includes('.')) {
                    return toastr.warning('Please type the proper email address.')
                }  else {
                const auth = this.todoService.authUser('/auth/signup', this.state.register).then(body => {
                    const {status, text} = body;

                    if (status === "failure" && text === "registered:true") {
                        // TODO set localstorage or smth to prevent further actions with the system
                        return toastr.warning('Such email is already registered, please Log in to your account.');
                    }  else {
                        toastr.success('User has been registered. Please Log in to your account.')
                        window.location = '/auth'
                        console.log(body);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    }
                })
                    console.log(auth);
                }

            } else {
                return toastr.error('Passwords should be the same.')
            }

        }


    getValue = (e) => {
        const value = e.target.value;

        // TODO correct UNDEFINED AND MAKE AS 1 FUNCTION
        const obj = {
            ...this.state.login,
            [e.target.name]: value,
            [e.target.name]: value,
        }

        this.setState(({login}) => ({
            login: obj
        }))

}



        getData = (e) => {
            e.preventDefault();
            // window.location = '/#attempt'
            const { email } = this.state.login;

            if (!email.includes('@') || !email.includes('.')) {
                return toastr.warning('Please type the proper email address.')
            } else {
                const auth = this.todoService.authUser('/auth/login', this.state.login).then(body => {
                    const { status, text } = body;

                    if (status === "failure" || text === "notfound") {
                        return toastr.warning('Such user does not exist. Please try again.')
                    } else {

                        const { status, token, userId: { email, name, todo } } = body;
                        const { connection } = this.props;

                        if (status === "Success" && token !== undefined) {
                            toastr.success(`Welcome on board, ${name}`);
                            setTimeout(() => {
                                sessionStorage.setItem('API', token);
                                const isAuthenticated = !!token;
                                useRoutes(isAuthenticated);
                                // TODO for now saved state login form in localstorage
                                localStorage.setItem('loginForm', "false");
                                connection();
                                window.location = '/dashboard'
                            }, 800)


                            // TODO add info to cookies or sessionStorage or somewhere to save this info
                        }



                        console.log(body)
                    }

                })
                console.log(auth);
            }


        }


render() {

        const { singIn, register, login } = this.state;

        let content;
        let btnInfo;


        if (singIn) {
            btnInfo = "I have an account"
            content = <SingUp values={this.setValue} states={register} data={this.sendData} />
        } else {
            btnInfo = "I would like to be a member"
            content = <SignIn values={this.getValue} states={login} data={this.getData}/>
        }

    return(
    <React.Fragment>
        <div className="signup__container animate__animated animate__backInDown">
            <div className="container__child signup__thumbnail">
                <div className="thumbnail__logo">
                    <h1 className="logo__text">Todo List</h1>
                </div>
                <div className="thumbnail__content center">
                    <h1 className="heading--primary">Welcome to the application.</h1>
                    <h4 className="heading--secondary">Are you ready to create your first todo?</h4>
                </div>
                <ul className="list-inline">
                    <li>
                        <a id="go" href="#" className="btn signup__link" onClick={this.changeMode}>{btnInfo}</a>
                    </li>
                </ul>
                <div className="signup__overlay-2"></div>
            </div>
            <div className="container__child signup__form">
                {content}
            </div>
        </div>
    </React.Fragment>
        )

        }


}

const SingUp = ({values, states, data}) => {
    const { name, email, password, passwordRepeat } = states;

    return(
        <React.Fragment>
            <form action='#' onSubmit={ data }>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" name="name" value={name} onChange={ values } id="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" value={email} onChange={ values } id="email" placeholder="Your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={ values } id="password" placeholder="********" required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRepeat">Repeat Password</label>
                    <input className="form-control" type="password" name="passwordRepeat" value={passwordRepeat} onChange={ values } id="passwordRepeat" placeholder="********" required />
                </div>
                <div className="m-t-lg">
                    <ul className="list-inline">
                        <li>
                            <input className="btn btn--form" type="submit" value="Register" />
                        </li>
                    </ul>
                </div>
            </form>
        </React.Fragment>
    )
}


const SignIn = ({ values, states, data }) => {
    const { email, password } = states;
    return(
        <React.Fragment>
                <form action="#" onSubmit={ data } className="signInForm">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" name="email" value={email} onChange={ values } id="email" placeholder="Your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password" value={password} onChange={ values } id="password" placeholder="********" required />
                    </div>
                    <div className="m-t-lg">
                        <ul className="list-inline">
                            <li>
                                <input className="btn btn--form" type="submit" value="Sign in" />
                            </li>
                        </ul>
                    </div>
                </form>
        </React.Fragment> )
}



