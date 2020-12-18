import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import AuthenticatedRouter from './hoc/AuthenticatedRouter/AuthenticatedRouter';

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render ()
  {
    return (
        <div>
          <Layout>
            <Switch>
              <AuthenticatedRouter path="/checkout" component={CheckOut}/>
              <AuthenticatedRouter  path="/orders" component={Orders}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" component={BurgerBuilder}/>
            </Switch>
          </Layout>
        </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:  () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null,  mapDispatchToProps)(App));
