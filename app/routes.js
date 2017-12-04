import React from 'react'
import { HashRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

import Privileges from './containers/privileges_HOC'
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
import PropertyProfile from './components/Pages/properties/profile'

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/login_registered" component={Login} />
                <Route path="/admin" component={Dashboard} />
                <Route path="/add_admin" component={Privileges(AddAdmin)} />
                <Route path="/edit_admin" component={Privileges(EditAdmin)} />
                <Route path="/edit_customer" component={Privileges(EditCustomer)} />
                <Route path="/add_customer" component={Privileges(AddCustomer)} />
                <Route path="/contracts" component={Contracts} />
                <Route path="/payments" component={Payments} />
                <Route path="/add_property" component={Privileges(AddProperty)} />
                <Route path="/edit_property" component={Privileges(EditProperty)} />
                <Route path="/property_profile" component={PropertyProfile} />
                <Route path="/" component={MainPage} />
            </Switch>
        </Router>
    )
}
