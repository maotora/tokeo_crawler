import React from 'react'
import { HashRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

import MainPage from './containers/mainPage'
import Dashboard from './components/Pages/Dashboard'
import Login from './components/Login'
import AddAdmin from './components/Pages/users/addAdmin'
import AddCustomer from './components/Pages/customers/addCustomers'
import Admin from './components/Pages/users/admin'

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Dashboard} />
                <Route path="/add_admin" component={AddAdmin} />
                <Route path="/add_customer" component={AddCustomer} />
                <Route path="/" component={MainPage} />
            </Switch>
        </Router>
    )
}
