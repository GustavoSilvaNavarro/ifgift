import { render, screen } from '@testing-library/react';

import { SearchLists } from '../Components/Search/SearchLists/SearchLists';
import { userInfo } from '../mocks/listMocks';

describe('Search List Component Tests', () => {
  test('Should render User information related to lists', () => {
    render(<SearchLists user={userInfo} />);

    const allLists = screen.getAllByLabelText('listContainerTest');

    expect(allLists.length).toBe(4);
    expect(screen.getByTestId('search-wantListTest').textContent).toMatch(userInfo.wantList);
    expect(screen.getByTestId('search-avoidListTest').textContent).toMatch(userInfo.avoidList);
    expect(screen.getByTestId('search-charityListTest').textContent).toMatch('');
    expect(screen.getByTestId('search-registryListTest').textContent).toMatch('');
  });
});
