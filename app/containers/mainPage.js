import React, { Component } from 'react'
import { View, Checkbox, Text, Button } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
const imgSource = './assets/img/product.png'

class Main extends Component {
    constructor(props) {
        super(props)
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

    render() {
        return (
            <Col style={styles.bg}>
                <Row style={styles.bottom}>
                    <Col>
                        <Button
                            onClick={::this.handleClick}
                            color="blue"
                            push={true}
                        >
                            Get Started
                        </Button>
                    </Col>

                    {/* TODO: I will get back to this sometime later...
                        <Col>
                            <View horizontalAlignment="center">
                                <Col>
                                    <p> Don't show this page again? </p>
                                </Col>

                                <Col>
                                    <Checkbox onChange={(e) => this.toggleStartup(e)} defaultChecked={true}/>
                                </Col>
                            </View>
                        </Col>
                    */}
                </Row>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    ui: state.ui
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

    },
    bottom: {
        position: 'absolute',
        bottom: 50,
        left: '50%'
    }
}
