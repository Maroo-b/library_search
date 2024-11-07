import React from 'react';

import { Button, Navbar, Container } from 'react-bootstrap'

type UserNavBarProps = {
    averageDuration: () => string|null;
    setIsAuthenticated: (val: boolean) => void;
}

const UserNavBar: React.FC<UserNavBarProps> = ({ averageDuration, setIsAuthenticated }) => {


    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Text >average call duration is milli sec: {averageDuration()} </Navbar.Text>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Test user</a>
                        </Navbar.Text>
                        <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    );
};

export default UserNavBar