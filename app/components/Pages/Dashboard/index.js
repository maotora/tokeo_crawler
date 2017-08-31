import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import Table from '../tables'
import Customers from '../customers'
import Properties from '../properties'
import Admin from '../users/admin'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'Tables'
        }
    }

    render() {
        return (
            <Col style={{overflow: 'hidden'}}> {/* Col -> Gives better fullscreen than Container */}
                <Row>
                    <Col>
                        <NavPane push={true} openLength={200}>
                            {this.renderItems('Tables', 'FaTh')}
                            {this.renderItems('Customer', 'FaGroup')}
                            {this.renderItems('Properties', 'FaBuilding')}
                            {this.renderItems('Admin', 'FaUser')}
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
                selected={this.state.selected === title}
                onSelect={() => this.setState({selected: title})}
            >
                <Text> {this.renderComponent(title)} </Text>
            </NavPaneItem>
        )
    }

    renderComponent(title) {
        if(title === 'Customer') {
            return <Customers {...this.props} />
        }
        else if(title === 'Admin') {
            return <Admin {...this.props} />
        }
        else if(title === 'Properties') {
            return <Properties {...this.props} />
        }
        else if(title === 'Tables') {
            return <Table {...this.props} />
        }
    }
}

const mapStateToProps = state => ({
    logged: state.login,
	users: state.users,
})

const styles = {
    container: {
        marginTop: 20,
        marginLeft: 50,
    }
}
export default connect(mapStateToProps)(Dashboard)
