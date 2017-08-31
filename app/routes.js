import React from 'react'
import { HashRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

import MainPage from './containers/mainPage'
import Dashboard from './components/Pages/Dashboard'
import Login from './components/Login'
import AddAdmin from './components/Pages/users/addAdmin'
import EditAdmin from './components/Pages/users/editAdmin'
import AddCustomer from './components/Pages/customers/addCustomers'
import EditCustomer from './components/Pages/customers/editCustomer'
import Admin from './components/Pages/users/admin'
import Contracts from './components/Pages/contracts'
import Payments from './components/Pages/payments'
import AddProperty from './components/Pages/properties/addProperty'
import EditProperty from './components/Pages/properties/editProperty'

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Dashboard} />
                <Route path="/add_admin" component={AddAdmin} />
                <Route path="/edit_admin" component={EditAdmin} />
                <Route path="/edit_customer" component={EditCustomer} />
                <Route path="/add_customer" component={AddCustomer} />
                <Route path="/contracts" component={Contracts} />
                <Route path="/payments" component={Payments} />
                <Route path="/add_property" component={AddProperty} />
                <Route path="/edit_property" component={EditProperty} />
                <Route path="/" component={MainPage} />
            </Switch>
        </Router>
    )
}
