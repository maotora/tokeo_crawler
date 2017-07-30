import React from 'react'
import { BrowserRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

// import App from './containers/App'
import App from './containers/App'
import MainPage from './containers/mainPage'
import AddAdmin from './containers/addAdmin'
import AddCustomer from './containers/addCustomer'
import LoggedIn from './components/LoggedIn'
import Login from './components/Login'

export default () => {
    return (
        <Router>
            <App>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/loggedin" component={LoggedIn} />
                    <Route path="/" component={MainPage} />
                </Switch>
            </App>
        </Router>
    )
}
