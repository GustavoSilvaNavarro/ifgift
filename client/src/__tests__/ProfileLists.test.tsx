import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProfileLists } from '../Components/Profile/ProfileLists/ProfileLists';

const listTextMock = { list: 'Socks, Medicine, Coffing drops, Coke' };

describe('Profile Lists Tests', () => {
  test('Should store list data in Want List', async () => {
    render(<ProfileLists />);

    const textArea = await screen.findByTestId('wantListTextArea');
    const btn = await screen.findByTestId('btnWantList');
    userEvent.type(textArea, listTextMock.list);
    userEvent.click(btn);

    expect(textArea.textContent).toMatch(listTextMock.list);
  });

  test('Should store list data in Avoid List', async () => {
    render(<ProfileLists />);

    const textArea = await screen.findByTestId('avoidListTextArea');
    const btn = await screen.findByTestId('btnAvoidList');
    userEvent.type(textArea, listTextMock.list);
    userEvent.click(btn);

    expect(textArea.textContent).toMatch(listTextMock.list);
  });

  test('Should store list data in Charity List', async () => {
    render(<ProfileLists />);

    const textArea = await screen.findByTestId('charityListTextArea');
    const btn = await screen.findByTestId('btnCharityList');
    userEvent.type(textArea, listTextMock.list);
    userEvent.click(btn);

    expect(textArea.textContent).toMatch(listTextMock.list);
  });

  test('Should store list data in Registry List', async () => {
    render(<ProfileLists />);

    const textArea = await screen.findByTestId('registryListTextArea');
    const btn = await screen.findByTestId('btnRegistryList');
    userEvent.type(textArea, listTextMock.list);
    userEvent.click(btn);

    expect(textArea.textContent).toMatch(listTextMock.list);
  });
});
