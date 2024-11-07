import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser } from './utilities/login';

import App from './App'

describe('App component', () => {
  describe('When the user is not logged in', () => {
    it('renders only the login form in the navbar', () => {
        render(<App/>);

        expect(screen.queryByText('Library search')).toBeNull()
    })
  })

  describe('when the user is logged in', () => {
    it('renders the search section',async () => {
        render(<App/>);
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        await userEvent.type(usernameInput, mockUser.username);
        await userEvent.type(passwordInput, mockUser.password);

        const loginButton = screen.getByRole('button', { name: /Login/i });
        await userEvent.click(loginButton);

        expect(screen.getByText('Library search')).toBeTruthy()
    })
  })

})