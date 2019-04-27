import React from 'react';
import  { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, fetchProducts, changeSearchParams } from "./actions/actions";
import { withRouter } from 'react-router-dom';
import { getTokenData } from "./utils/utils";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }
    handleSignOut(event) {
        event.preventDefault();
        this.props.signOut(() => {
            this.props.history.push('/');
        });
    }
    handleInputChange(event) {
        this.setState({
            search: event.target.value,
        });
    }
    handleSearch(event) {
        event.preventDefault();
        const searchText = this.state.search;
        this.props.fetchProducts(this.props.perPage, 1, searchText, () => {
            this.props.changeSearchParams(1, searchText);
        });
    }
    render() {
        const tokenData = getTokenData(localStorage.getItem('token'));
        const authenticated = this.props.authenticated;
        const search = this.state.search;
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Logo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link" exact activeClassName="active" to="/">Home <span class="sr-only">(current)</span></NavLink>
                            { !authenticated &&
                            <NavLink className="nav-item nav-link" exact activeClassName="active" to="/signin">Sign in</NavLink>
                            }
                            {!authenticated &&
                            <NavLink className="nav-link" to="/signup" exact activeClassName="active">Sign up</NavLink>
                            }
                            { authenticated &&
                            <NavLink
                                className="nav-item nav-link"
                                exact activeClassName="active"
                                to={"/profile/" + tokenData.id}>
                                {tokenData.login}
                            </NavLink>
                            }
                            { authenticated &&
                            <a className="nav-item nav-link" href="#"
                               onClick={this.handleSignOut.bind(this)} >Sign out</a>
                            }
                        </div>
                        <form className="form-inline my-2 my-lg-0">
                            <input value={search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                   onChange={this.handleInputChange.bind(this)}/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSearch.bind(this)}>Search</button>
                        </form>

                    </div>
                </nav>
            </header>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authenticated: state.users.authenticated,
        perPage: state.products.perPage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (perPage, currentPage, searchText, successCallback) =>
            dispatch(fetchProducts(perPage, currentPage, searchText, successCallback)),
        changeSearchParams: (page, searchText) => {
            dispatch(changeSearchParams(page, searchText));
        },
        signOut: (successCallback) => {
            dispatch(signOut(successCallback));
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
