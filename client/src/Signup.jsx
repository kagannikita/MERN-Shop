import React from 'react';
import { connect } from 'react-redux';
import { signup } from "./actions/actions";
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            error: '',
            login:'',
            phonenumber:''
        }
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleFormSubmit(event) {
        event.preventDefault();

        const { firstName, lastName, email, password, password2,login,phonenumber } = this.state;
        let valid = true;
        if (password !== password2) {
            valid = false;
            this.setState({
                error: 'Passwords not equal'
            });
        }
        if (valid) {
            this.props.signup(firstName, lastName, email, password,login,phonenumber,
                () => {
                    const decodedToken = jwtDecode(localStorage.getItem('token'));
                    this.props.history.push(`/profile/${decodedToken.id}`);
                }, (error) => {
                    console.log('error happened ', error);
                    this.setState({
                        error: error.message || 'Internal server error'
                    })
                });
        }
    }
    render() {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const password = this.state.password;
        const password2 = this.state.password2;
        const error = this.state.error;
        const login=this.state.login;
        const phonenumber=this.state.phonenumber;
        return (
            <div className="signup-body">
                <form className="signup-form">
                    <div className="signup-form-body">
                        <h3 className="text-center">Sign up</h3>
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input
                                value={login}
                                onChange={this.handleInputChange.bind(this)}
                                name="login"
                                type="text" className="form-control"
                                id="firstName" placeholder="login"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <input
                                value={firstName}
                                onChange={this.handleInputChange.bind(this)}
                                name="firstName"
                                type="text" className="form-control"
                                id="firstName" placeholder="First name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                value={lastName}
                                onChange={this.handleInputChange.bind(this)}
                                name="lastName"
                                type="text" className="form-control"
                                id="lastName" placeholder="Last name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={this.handleInputChange.bind(this)}
                                name="email"
                                type="email" className="form-control"
                                id="email" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={this.handleInputChange.bind(this)}
                                name="password"
                                type="password" className="form-control"
                                id="password" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Password again</label>
                            <input
                                value={password2}
                                onChange={this.handleInputChange.bind(this)}
                                name="password2"
                                type="password" className="form-control"
                                id="password2" placeholder="Password again"/>

                            {error &&
                            <p className="text-danger mt-2">{error}</p>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="phonenumber">Phone number</label>
                            <input
                                value={phonenumber}
                                onChange={this.handleInputChange.bind(this)}
                                name="phonenumber"
                                type="text" className="form-control"
                                id="firstName" placeholder="Phone number"/>
                        </div>
                    </div>
                    <button
                        onClick={this.handleFormSubmit.bind(this)}
                        type="submit" className="btn btn-primary signup-btn" >
                        Sign up
                    </button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (firstName, lastName, email, password,login,phonenumber, success, fail) => {
            dispatch(signup(firstName, lastName, email, password,login,phonenumber, success, fail));
        }
    }
};
export default withRouter(connect(null, mapDispatchToProps)(Signup));
