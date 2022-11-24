import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';

import { UserContext } from '../context/UserContext';
import { MyLists } from '../Components/MyLists/MyLists';
import { userInfo, listsMocks } from '../mocks/listMocks';

describe('MyLists Component tests', () => {
  test('Should Render the lists of events', async () => {
    const updateUserInfo = jest.fn();

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <StaticRouter location={'/mylists'}>
          <MyLists />
        </StaticRouter>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('arrayOfListsTest').length).toBe(3);
      expect(screen.getByText(listsMocks[0].text)).toBeInTheDocument();
      expect(screen.getByText(listsMocks[1].text)).toBeInTheDocument();
      expect(screen.getByText(listsMocks[2].text)).toBeInTheDocument();
      expect(screen.getByText(listsMocks[0].title)).toBeInTheDocument();
      expect(screen.getByText(listsMocks[1].title)).toBeInTheDocument();
      expect(screen.getByText(listsMocks[2].title)).toBeInTheDocument();
    });
  });

  test('Should add one more item to the lists', async () => {
    const updateUserInfo = jest.fn();

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <StaticRouter location={'/mylists'}>
          <MyLists />
        </StaticRouter>
      </UserContext.Provider>
    );

    await waitFor(async () => {
      const btn = screen.getByTestId('btnAddToListTest');
      fireEvent.click(btn);

      await waitFor(() => {
        expect(screen.getAllByTestId('arrayOfListsTest').length).toBe(4);
      });
    });
  });
});
