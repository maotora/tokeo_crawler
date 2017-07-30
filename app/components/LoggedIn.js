import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'

class LoggedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'Customer'
        }
    }

    render() {
        return (
            <View width="100%">
                <Col>
                    <Row>
                        <NavPane push={true} openLength={200}>
                            {this.renderItems('Customer', 'Customers Content', 'FaUser')}
                            {this.renderItems('Tables', 'Tables Content', 'FaTh')}
                            {this.renderItems('Admin', 'Admin Content', 'FaUserSecret')}
                        </NavPane>
                    </Row>
                </Col>
            </View>
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
            return (
                <Col>
                    <Col md={8}>
                        <Text 
                            horizontalAlignment="center"
                            style={{fontSize: 20}}
                        > Customers Page </Text>
                    </Col>
                    <Col md={4}>
                        <Text>Logged in as {this.props.user.username}</Text>
                    </Col>
                </Col>
            )
        }
        else if(title === 'Admin') {
            return (
                <Col>
                    <Col md={8}>
                        <Text 
                            horizontalAlignment="center"
                            style={{fontSize: 20}}
                        > Admin Page </Text>
                    </Col>
                    <Col md={4}>
                        <Text>Logged in as {this.props.user.username}</Text>
                    </Col>
                </Col>

            )
        }
        else if(title === 'Tables') {
            return (
                <Col>
                    <Col md={8}>
                        <Text 
                            horizontalAlignment="center"
                            style={{fontSize: 20}}
                        > Tables Screen </Text>
                    </Col>
                    <Col md={4}>
                        <Text>Logged in as {this.props.user.username}</Text>
                    </Col>
                </Col>
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(LoggedIn)
