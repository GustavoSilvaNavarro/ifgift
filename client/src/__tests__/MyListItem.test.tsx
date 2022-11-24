/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MyListItem } from '../Components/MyLists/MyListItem/MyListItem';
import { UserContext } from '../context/UserContext';
import { listsMocks, userInfo, list, listsMocksUpdated } from '../mocks/listMocks';

describe('MyListItem Component tests', () => {
  test('Should render component list details when props have been passed', () => {
    const updateUserInfo = jest.fn();
    const setAllMyLists = jest.fn();

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <MyListItem myList={listsMocks[1]} setAllMyLists={setAllMyLists} />
      </UserContext.Provider>
    );

    const h1Title = screen.getByLabelText('titleListTest');
    const inputTitle = screen.getByTestId('inputListNameTitleTest') as HTMLInputElement;
    const selectEl = screen.getByLabelText('selectUserNameTest') as HTMLSelectElement;
    const textArea = screen.getByLabelText('textAreaTextTest') as HTMLTextAreaElement;
    const allOptions = screen.getAllByTestId('optionTestId') as HTMLOptionElement[];

    expect(h1Title.textContent).toEqual(listsMocks[1].title);
    expect(inputTitle.value).toEqual(listsMocks[1].title);
    expect(selectEl.value).toEqual(listsMocks[1].recipient);
    expect(textArea.textContent).toEqual(listsMocks[1].text);

    userEvent.clear(inputTitle);
    userEvent.clear(textArea);

    userEvent.type(inputTitle, listsMocks[0].title);
    userEvent.type(textArea, listsMocks[0].text);
    fireEvent.change(selectEl, { target: { value: listsMocks[0].recipient } });

    expect(allOptions[0].selected).toBeTruthy();
    expect(allOptions[1].selected).toBeFalsy();
    expect(allOptions[2].selected).toBeFalsy();
    expect(inputTitle.value).toEqual(listsMocks[0].title);
    expect(textArea.textContent).toEqual(listsMocks[0].text);
  });

  test('Should update the list', async () => {
    const updateUserInfo = jest.fn();
    const setAllMyLists = jest.fn();

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <MyListItem myList={list} setAllMyLists={setAllMyLists} />
      </UserContext.Provider>
    );

    const inputTitle = screen.getByTestId('inputListNameTitleTest') as HTMLInputElement;
    const selectEl = screen.getByLabelText('selectUserNameTest') as HTMLSelectElement;
    const textArea = screen.getByLabelText('textAreaTextTest') as HTMLTextAreaElement;

    userEvent.type(inputTitle, listsMocksUpdated[3].title);
    userEvent.type(textArea, listsMocksUpdated[3].text);
    fireEvent.change(selectEl, { target: { value: listsMocksUpdated[3].recipient } });

    const btn = screen.getByTestId('btnUpdateList');
    userEvent.click(btn);

    await waitFor(() => expect(setAllMyLists).toHaveBeenCalledTimes(1));
  });

  test('Should delete on item from list', async () => {
    const updateUserInfo = jest.fn();
    const setAllMyLists = jest.fn();

    render(
      <UserContext.Provider value={{ userInfo, updateUserInfo }}>
        <MyListItem myList={list} setAllMyLists={setAllMyLists} />
      </UserContext.Provider>
    );

    const btn = screen.getByTestId('trashBtnId');
    userEvent.click(btn);

    await waitFor(() => expect(setAllMyLists).toHaveBeenCalledTimes(1));
  });
});
