/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen, waitFor } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import userEvent from '@testing-library/user-event';
import * as auth0 from '@auth0/auth0-react';

import { ProfileForm } from '../Components/Profile/ProfileForm/ProfileForm';
import { UserContext } from '../context/UserContext';

jest.mock('@auth0/auth0-react');

const mockedUsedNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

const user = {
  nickname: 'test',
  name: 'test@test.com',
  email: 'test@test.com',
  sub: 'auth0|637639a467ad3e09030c885e',
};

const userInfo = {
  _id: '63779535035d7144362f1cb2',
  address: '107 Main Street',
  avoidList: 'Beer, Coke, Cake',
  birthday: '2022-11-11',
  email: 'test@test.com',
  gifPref: 'Gifts from My Registries',
  name: 'Ron',
  pronouns: 'yooo',
  userName: 'Kane',
  wantList: 'Socks, Medicine',
};

describe('Profile Form Components Tests', () => {
  test('Return Loading if it is not authenticated', () => {
    const userData = user;
    const isAuthenticated = false;
    const isLoading = true;

    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      user: userData,
      isAuthenticated,
      isLoading,
    });
    render(
      <StaticRouter location={'/editProfile'}>
        <ProfileForm />
      </StaticRouter>
    );

    const loader = screen.getByTestId('loadingPage');

    expect(loader.textContent).toMatch(/Loading .../);
  });

  test('Profile Form should render properly when user is authenticated', () => {
    const userData = user;
    const isAuthenticated = true;
    const isLoading = false;
    const updateUserInfo = jest.fn();

    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      user: userData,
      isAuthenticated,
      isLoading,
    });

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <StaticRouter location={'/editprofile'}>
          <ProfileForm />
        </StaticRouter>
      </UserContext.Provider>
    );

    const inputs = screen.getAllByLabelText('profileForm-input');
    const btn = screen.getByRole('button', { name: 'Save Changes' });
    const email = screen.getByTestId('emailTestId');

    expect(inputs.length).toBe(5);
    expect(email.textContent).toEqual(userInfo.email);
    expect(btn).toBeInTheDocument();
  });

  test('User can update his info', async () => {
    const userData = user;
    const isAuthenticated = true;
    const isLoading = false;
    const updateUserInfo = jest.fn();

    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      user: userData,
      isAuthenticated,
      isLoading,
    });

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <StaticRouter location={'/editprofile'}>
          <ProfileForm />
        </StaticRouter>
      </UserContext.Provider>
    );

    const inputName = screen.getByTestId('testName');
    const inputUserName = screen.getByTestId('testUserName');
    const inputPronouns = screen.getByTestId('testPronouns');
    const inputBirthday = screen.getByTestId('testBirthday');
    const inputAddress = screen.getByTestId('testAddress');
    const btn = screen.getByRole('button', { name: 'Save Changes' });

    userEvent.type(inputName, userInfo.name);
    userEvent.type(inputUserName, userInfo.userName);
    userEvent.type(inputPronouns, userInfo.pronouns);
    userEvent.type(inputBirthday, userInfo.birthday);
    userEvent.type(inputAddress, userInfo.address);

    userEvent.click(btn);

    await waitFor(() => expect(updateUserInfo).toHaveBeenCalledTimes(1));
  });
});
