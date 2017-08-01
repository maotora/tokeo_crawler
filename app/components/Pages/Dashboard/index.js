import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import Table from './tables'
import Customers from '../customers'
import Admin from '../users/admin'

class LoggedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'Customer'
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Row>
                    <Col>
                        <NavPane push={true} openLength={200}>
                            {this.renderItems('Customer', 'Customers Content', 'FaUser')}
                            {this.renderItems('Tables', 'Tables Content', 'FaTh')}
                            {this.renderItems('Admin', 'Admin Content', 'FaUserSecret')}
                        </NavPane>
                    </Col>
                </Row>
            </Container>
        );
    }

    renderItems(title, content, iconParam) {
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
        else if(title === 'Tables') {
            return <Table {...this.props} />
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const styles = {
    container: {
        marginTop: 20,
        marginLeft: 50,
    }
}
export default connect(mapStateToProps)(LoggedIn)
