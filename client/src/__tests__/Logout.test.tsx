import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as auth0 from '@auth0/auth0-react';

import { LogOutButton } from '../Components/LogOutButton/LogOutButton';

jest.mock('@auth0/auth0-react');

describe('Logout Component tests', () => {
  test('Logout button should be called when user clicks', () => {
    const logout = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      logout,
    });

    render(<LogOutButton />);

    const btn = screen.getByRole('button', { name: 'Log Out' });
    userEvent.click(btn);

    expect(btn).toBeInTheDocument();
    expect(logout).toBeCalled();
  });
});
