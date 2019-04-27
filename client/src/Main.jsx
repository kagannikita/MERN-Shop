import { Route, Switch } from 'react-router-dom'
import App from './App';
import ProductDetail from './ProductDetail';
import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Header from './Header';
import Profile from './Profile';
class Main extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/detail/:productId" component={ProductDetail}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/profile/:profileId" component={Profile}/>
                    <Route path="/" component={App}/>
                </Switch>
            </div>
        )
    }
}
export default Main;
