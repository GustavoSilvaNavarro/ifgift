/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import * as auth0 from '@auth0/auth0-react';

import { UserContext } from '../context/UserContext';
import { Profile } from '../Components/Profile/Profile';

jest.mock('@auth0/auth0-react');

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
  birthday: '2022-09-20T00:00:00.000Z',
  email: 'test@test.com',
  gifPref: 'Gifts from My Registries',
  name: 'Ron',
  pronouns: 'yooo',
  userName: 'Kane',
  wantList: 'Socks, Medicine',
};

const dateMock = '19 September';

describe('Profile Component Tests', () => {
  test('Profile Component should render users info', () => {
    const userData = user;
    const isAuthenticated = true;
    const isLoading = false;
    const updateUserInfo = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      user: userData,
      isAuthenticated,
      isLoading,
    });

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <StaticRouter location={'/'}>
          <Profile />
        </StaticRouter>
      </UserContext.Provider>
    );

    const name = screen.getByTestId('testProfileName');
    const userName = screen.getByTestId('testUserName');
    const pronouns = screen.getByTestId('testPronouns');
    const email = screen.getByTestId('testEmail');
    const address = screen.getByTestId('testAddress');
    const birthday = screen.getByTestId('testBirthday');
    const userImage = screen.getByTestId('userImgTest') as HTMLImageElement;
    const textAreaWantList = screen.getByTestId('wantListTextArea');

    expect(name.textContent).toEqual(userInfo.name);
    expect(userName.textContent).toEqual(`@${userInfo.userName}`);
    expect(pronouns.textContent).toEqual(userInfo.pronouns);
    expect(email.textContent).toEqual(userInfo.email);
    expect(address.textContent).toEqual(userInfo.address);
    expect(birthday.textContent).toEqual(`born: ${dateMock}`);
    expect(userImage.src).toContain('https://i.pinimg.com/originals/4b/4b/5e/4b4b5e5370d0888937788489a3923f24.jpg');
    expect(textAreaWantList.textContent).toEqual(userInfo.wantList);
  });

  test('Should show a loading when user is not authenticated', () => {
    const userData = user;
    const isAuthenticated = false;
    const isLoading = true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (auth0 as any).useAuth0 = jest.fn().mockReturnValue({
      user: userData,
      isAuthenticated,
      isLoading,
    });

    render(
      <StaticRouter location={'/'}>
        <Profile />
      </StaticRouter>
    );

    const loadingScreen = screen.getByTestId('profileLoader');

    expect(loadingScreen.textContent).toMatch(/Loading .../);
  });
});
