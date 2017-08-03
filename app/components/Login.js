import React from 'react';
import { Container, Row, Col } from 'react-grid-system'
import SignIn from './Forms/signin'

const Login = (props) => {
    return (
        <Container style={styles.container}>
            <Row>
                <Col md={4}>
                    <SignIn {...props} />
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
}

const styles = {
    container: {
        padding: 30
    }
}

export default Login
