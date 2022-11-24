import { render, screen } from '@testing-library/react';

import { SearchItem } from '../Components/Search/SearchItem/SearchItem';
import { userInfo } from '../mocks/listMocks';

describe('Search Item tests', () => {
  test('Should render user info when props has been passed', () => {
    render(<SearchItem user={userInfo} />);

    const name = screen.getByLabelText('testNameId');
    const userName = screen.getByLabelText('testUserNameId');
    const pronouns = screen.getByLabelText('testPronounsId');
    const email = screen.getByLabelText('testEmailId');
    const address = screen.getByLabelText('testAddressId');
    const birthday = screen.getByLabelText('testBirthdayId');

    expect(name.textContent).toMatch(userInfo.name);
    expect(userName.textContent).toMatch(`@${userInfo.userName}`);
    expect(pronouns.textContent).toMatch(userInfo.pronouns);
    expect(email.textContent).toMatch(userInfo.email);
    expect(address.textContent).toMatch(userInfo.address);
    expect(birthday.textContent).toMatch('born: 19 September');
  });
});
