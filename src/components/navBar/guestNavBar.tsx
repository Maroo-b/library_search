import React, { useState } from 'react';

import { Alert, Button, Form, FormControl, Navbar, Container, Row, Col } from 'react-bootstrap'

type GuestNavBarProps = {
    handleLogin: (username: string, password: string) => boolean;
}

const GuestNavBar: React.FC<GuestNavBarProps> = ({ handleLogin }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (handleLogin(username, password)) {
            setErrorMessage(null);
            setUsername('')
        } else {
            setErrorMessage('Invalid username or password.');
        }
        setPassword('')
    };

    return (
        <>

            <Navbar className="bg-body-tertiary">
                <Container>

                    <Navbar.Collapse className="justify-content-end">
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <FormControl
                                    type="text"
                                    placeholder="Username"
                                    className="mr-sm-2"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    className="mr-sm-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Col>

                            <Col xs="auto">
                                <Button type="submit" variant="primary">
                                    Login
                                </Button>

                            </Col>
                        </Row>
                    </Form>
</Navbar.Collapse>
                </Container>
            </Navbar>
            {errorMessage && (
                <Alert variant="danger" className="mt-2">
                    {errorMessage}
                </Alert>
            )}
        </>
    );
};

export default GuestNavBar