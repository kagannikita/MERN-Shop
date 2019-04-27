import React from 'react';
import {connect} from 'react-redux';
import { signin } from "./actions/actions";
import { withRouter } from 'react-router-dom';
import { getIdFromToken } from "./utils/utils";
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            error: ''
        };
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { login, password } = this.state;

        this.props.signin(login, password, () => {
                const userId = getIdFromToken(localStorage.getItem('token'));
                this.props.history.push('/profile/' + userId);
            }
        , (error) => {
            this.setState({
                error: error
            });
        });
    }


    render() {
        const login = this.state.login;
        const password = this.state.password;

        const error = this.state.error;

        return (
            <div className="signin-body">
                <form className="signin-form">
                    <div className="signin-form-body">
                        <h3 className="text-center">Sign in</h3>
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input name="login" value={login} onChange={this.handleInputChange.bind(this)}
                                   type="login" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter login"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your login with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" value={password} onChange={this.handleInputChange.bind(this)}
                                   type="password" className="form-control" id="password" placeholder="Password"/>
                        </div>

                        <p className="text-danger">{error}</p>
                    </div>


                    <button type="submit" className="btn btn-primary signin-btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (login, password, successCallback, errorCallback) => {
            dispatch(signin(login, password, successCallback, errorCallback));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
