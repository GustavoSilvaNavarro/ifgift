import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom/server';
import { useAuth0, User } from '@auth0/auth0-react';

import { LogIn } from '../Components/LogIn/LogIn';

jest.mock('@auth0/auth0-react');

interface MockedUseAuth0 extends User {
  mockReturnValue: jest.Mock;
}

describe('Login Process using Auth0', () => {
  test('Login Process using Auth0', () => {
    const loginWithPopup = jest.fn();
    (useAuth0 as unknown as MockedUseAuth0).mockReturnValue({
      loginWithPopup,
    });

    render(
      <StaticRouter location={'/'}>
        <LogIn />
      </StaticRouter>
    );

    const img = screen.getByAltText('ifGift logo');
    const loginBtn = screen.getByRole('button', { name: 'Sign up' });
    userEvent.click(loginBtn);

    expect(img).toBeInTheDocument();
    expect(useAuth0).toHaveBeenCalled();
    expect(loginWithPopup).toHaveBeenCalled();
  });
});

describe('Login Component tests', () => {
  test('Render Correctly Login Component', () => {
    const loginWithPopup = jest.fn();
    (useAuth0 as unknown as MockedUseAuth0).mockReturnValue({
      loginWithPopup,
    });

    const tree = create(
      <StaticRouter location={'/'}>
        <LogIn />
      </StaticRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Login Button displays text', () => {
    const loginWithPopup = jest.fn();
    (useAuth0 as unknown as MockedUseAuth0).mockReturnValue({
      loginWithPopup,
    });

    render(
      <StaticRouter location={'/'}>
        <LogIn />
      </StaticRouter>
    );

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toHaveTextContent(/Sign up/);
  });
});
