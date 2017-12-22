import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import Table from '../tables'
import Customers from '../customers'
import Properties from '../properties'
import Admin from '../users/admin'
import Settings from '../settings'
import About from '../about'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.logged) {
            this.props.history.push('/login')
        }

    }

    componentDidMount() {
        this.props.dispatch({type: 'TOGGLE_REG'})
    }

    logout() {
        this.props.dispatch({type: 'LOGOUT'})
    }

    changeSelect(title) {
        this.props.dispatch({type: 'DASHBOARD_SELECTION', payload: {selection: title}})
    }

    render() {
        return (
            <Col style={{overflow: 'hidden'}}> {/* Col -> Gives better fullscreen than Container */}
                <Row>
                    <Col>
                        <NavPane push={true} openLength={200}>
                            {this.renderItems('Dashboard', 'FaTh')}
                            {this.renderItems('Customer', 'FaGroup')}
                            {this.renderItems('Properties', 'FaBuilding')}
                            {this.renderItems('Settings', 'FaCog')}
                            {this.renderItems('Admin', 'FaUser')}
                            {this.renderItems('About', 'FaMapSigns')}
                        </NavPane>
                    </Col>
                </Row>
            </Col>
        );
    }

    renderItems(title, iconParam) {
        const icon = icons[iconParam]
        return (
            <NavPaneItem
                title={title}
                icon={icon()}
                push={true}
                selected={this.props.ui.selection === title}
                onSelect={() => this.changeSelect(title)}
            >
                <Text> {this.renderComponent(title)} </Text>
            </NavPaneItem>
        )
    }

    renderComponent(title) {
        if(title === 'Customer') {
            return <Customers logout={::this.logout} {...this.props} />
        }
        else if(title === 'Admin') {
            return <Admin logout={::this.logout} {...this.props} />
        }
        else if(title === 'Properties') {
            return <Properties logout={::this.logout} {...this.props} />
        }
        else if(title === 'Dashboard') {
            return <Table logout={::this.logout} {...this.props} />
        }
        else if(title === 'Settings') {
            return <Settings logout={::this.logout} {...this.props} />
        }
        else if(title === 'About') {
            return <About logout={::this.logout} {...this.props} />
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
	users: state.users,
	ui: state.ui,
})

const styles = {
    container: {
        marginTop: 20,
        marginLeft: 50,
    }
}
export default connect(mapStateToProps)(Dashboard)
