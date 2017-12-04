import React, { Component } from 'react'
import { ProgressCircle, View, Checkbox, Text, Button } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
const imgSource = './assets/img/product.png'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updateComplete: false
        }
    }

    handleClick() {
        this.props.history.push('/login')
    }

    toggleStartup(e) {
        console.log(e.target.value)
        this.props.dispatch({type: 'STARTUP_TOGGLE', payload: {startup: e.target.value}})
    }

    componentWillMount() {
        if(this.props.ui.showStartup === 'false') {
            this.props.history.push('/admin')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.customerUpdate) {
            this.setState({updateComplete: nextProps.customerUpdate})
        }
    }

    renderButton() {
        if(this.state.updateComplete) {
            return (
                <Button
                onClick={::this.handleClick}
                color="#E6E6E6"
                push={true}
                style={{padding: 28}}
                >
                        <Text color="black" style={{fontSize: 18, fontWeight: 'bold'}}> Get Started </Text>
                </Button>
            )
        } else {
            return <ProgressCircle color="white" />
        }
    }

    componentDidMount() {
        this.props.dispatch({type: 'UPDATE_CUSTOMER_EXPIRY'})
    }

    render() {
        return (
            <Col style={styles.bg}>
                <View horizontalAlignment="center" style={styles.bottom} >
                    {this.renderButton()}
                </View>

            </Col>
        )
    }
}

const mapStateToProps = state => ({
    ui: state.ui,
    customerUpdate: state.expiryUpdate,
})

export default connect(mapStateToProps)(Main)

const styles = {
    bg: {
        width: 1024,
        height: 728,
        backgroundImage: `url(${imgSource})`,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(33, 182, 182, 255)',
        position: 'relative',

    },
    bottom: {
        position: 'absolute',
        bottom: 30,
        left: '42%'
    }
}
