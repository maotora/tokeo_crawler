import React from 'react';
import { Container, Row, Col } from 'react-grid-system'
import SignUp from './Pages/users/signup'
import SignIn from './Pages/users/signin'

const Login = (props) => {
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <SignUp {...props} />
                </Col>
                <Col md={4}>
                    <SignIn {...props} />
                </Col>
            </Row>
        </Container>
    );
}

export default Login
