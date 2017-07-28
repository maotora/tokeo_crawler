import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import MainPage from './containers/mainPage'
import AddAdmin from './containers/addAdmin'
import AddCustomer from './containers/addCustomer'
import LoggedIn from './containers/LoggedInPage'
import Login from './containers/LoginPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="add_customer" component={AddCustomer} />
    <Route path="add_admin" component={AddAdmin} />
    <Route path="login" component={Login} />
    <Route path="loggedin" component={LoggedIn} />
  </Route>
);
