/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';

import { Search } from '../Components/Search/Search';
import { arrayOfUsers } from '../mocks/listMocks';

describe('Search Component Tests', () => {
  test('Should render all users', async () => {
    render(
      <StaticRouter location={'/search'}>
        <Search />
      </StaticRouter>
    );

    await waitFor(() => {
      const selectEl = screen.getByTestId('select-userTest') as HTMLSelectElement;
      const allOptions = screen.getAllByTestId('optionUser-test') as HTMLOptionElement[];

      fireEvent.change(selectEl, { target: { value: arrayOfUsers[1].email } });

      expect(allOptions[0].selected).toBeFalsy();
      expect(allOptions[1].selected).toBeTruthy();

      const allLists = screen.getAllByLabelText('listContainerTest');

      expect(allLists.length).toBe(4);
      expect(screen.getByTestId('search-wantListTest').textContent).toMatch(arrayOfUsers[1].wantList);
      expect(screen.getByTestId('search-avoidListTest').textContent).toMatch(arrayOfUsers[1].avoidList);
    });
  });
});
