import React, { Component } from 'react'
import { View, Checkbox, Text, Button } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'

class Main extends Component {
    constructor(props) {
        super(props)
    }

    handleClick() {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Container>
                <Row>
                    <View>
                        <Text 
                            horizontalAlignment="center"
                            verticalAlignment="center"
                            width="100%"
                            style={{fontSize: 42}}>
                            Welcome To Mijengo App
                        </Text>
                    </View>
                </Row>

                <Row>
                    <View>
                        <Text
                            horizontalAlignment="center"
                            verticalAlignment="center"
                            padding="100px"
                            width="100%"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam justo urna, posuere vitae est et, accumsan
                            bibendum sapien. Suspendisse lobortis mollis finibus. Nunc tincidunt enim est, efficitur semper dolor luctus
                            eget. Donec faucibus dolor id leo tincidunt, condimentum mattis augue finibus. Etiam hendrerit ipsum nisi,
                            vel semper dolor malesuada a. Pellentesque a scelerisque sapien, quis interdum odio. Nulla posuere, velit sit
                            amet lacinia pharetra, sapien arcu convallis dolor, id congue erat lectus nec sem. Praesent pretium a nisi et
                            elementum. Cras lacinia sollicitudin suscipit. Phasellus accumsan felis odio. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac turpis egestas.
                        </Text>
                    </View>
                </Row>

                <Row>
                    <View horizontalAlignment="center">
                        <Button
                            onClick={::this.handleClick}
                            color="blue"
                            push={true}
                        >
                            Get Started
                        </Button>
                    </View>
                </Row>

                <Row style={{margin: '20px'}}>
                    <View horizontalAlignment="center">
                        <Text> Don't show this page again? </Text>
                        <Checkbox />
                    </View>
                </Row>
            </Container>
        )
    }
}

export default Main
