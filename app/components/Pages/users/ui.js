import React from 'react'
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Row, Col, Container } from 'react-grid-system'

const SigninText = props => {
    return (
        <Container>
            <Row>
                <Col>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={{lineHeight: 4, fontSize: 20, fontWeight: 'bold'}}>
                            Signin Please
                        </Text>
                    </View>
                </Col>
                <Col>
                    <Text>
                        Nunc varius risus quis nulla. Vivamus vel magna. Ut rutrum. Aenean dignissim,
                        leo quis faucibus semper, massa est faucibus massa, sit amet pharetra arcu nunc
                        et sem. Aliquam tempor. Nam lobortis sem non urna. Pellentesque et urna sit
                        amet leo accumsan volutpat. Nam molestie lobortis lorem. Quisque eu nulla.
                        Donec id orci in ligula dapibus egestas. Donec sed velit ac lectus mattis
                        sagittis.

                        In hac habitasse platea dictumst. Maecenas in ligula. Duis tincidunt odio
                        sollicitudin quam. Nullam non mauris. Phasellus lacinia, velit sit amet
                        bibendum euismod, leo diam interdum ligula, eu scelerisque sem purus in tellus.

                        Lorem ipsum dolor sit.
                    </Text>
                </Col>
            </Row>
        </Container>
    )
}

const SignupText = props => {
    return (
        <Container>
            <Row>
                <Col>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={{lineHeight: 4, fontSize: 20, fontWeight: 'bold'}}>
                            Signup Please
                        </Text>
                    </View>
                </Col>
                <Col>
                    <Text>
                        Nunc varius risus quis nulla. Vivamus vel magna. Ut rutrum. Aenean dignissim,
                        leo quis faucibus semper, massa est faucibus massa, sit amet pharetra arcu nunc
                        et sem. Aliquam tempor. Nam lobortis sem non urna. Pellentesque et urna sit
                        amet leo accumsan volutpat. Nam molestie lobortis lorem. Quisque eu nulla.
                        Donec id orci in ligula dapibus egestas. Donec sed velit ac lectus mattis
                        sagittis.

                        In hac habitasse platea dictumst. Maecenas in ligula. Duis tincidunt odio
                        sollicitudin quam. Nullam non mauris. Phasellus lacinia, velit sit amet
                        bibendum euismod, leo diam interdum ligula, eu scelerisque sem purus in tellus.

                        Lorem ipsum dolor sit.
                    </Text>
                </Col>
            </Row>
        </Container>
    )
}

export { SignupText, SigninText }
