import React from 'react'
import { HashRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

// import App from './containers/App'
import App from './containers/App'
import MainPage from './containers/mainPage'
import Dashboard from './components/Pages/Dashboard'
import Login from './components/Login'

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/loggedin" component={Dashboard} />
                <Route path="/" component={MainPage} /> {/*Suppose to be MainPage*/}
            </Switch>
        </Router>
    )
}
