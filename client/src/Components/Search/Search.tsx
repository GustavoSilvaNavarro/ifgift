import { useEffect, useState } from 'react';

import './Search.css';

import SearchItem from './SearchItem/SearchItem';
import SearchLists from './SearchLists/SearchLists';
import { getAllUsers } from '../../services/user-service';
import { IUser } from '../../types/app-types';

export const Search = (): JSX.Element | null => {
  const [allUsers, setAllUsers] = useState([] as Array<IUser>);
  const [options, setOptions] = useState([] as { value: IUser; label: string }[]);
  const [selectedUser, setSelectedUser] = useState({ email: '' } as IUser);

  useEffect(() => {
    void getAllUsers().then(users => {
      if (users) {
        const options = users.map(user => ({ value: user, label: user.email ? user.email : '' }));
        setOptions(options);
        setAllUsers(users);
      }
    });
  }, []);

  function handleSearchChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const email = e.target.value;
    const user = allUsers.find(el => el.email === email);
    if (user) setSelectedUser(user);
  }

  if (selectedUser.email === '') {
    return allUsers.length > 0 ? (
      <div className="search-container">
        <select
          className="search-bar"
          data-testid="select-userTest"
          value={selectedUser.email}
          onChange={handleSearchChange}
        >
          <option />
          {options.map(opt => (
            <option key={opt.label} data-testid="optionUser-test" value={opt.label}>
              {opt.value.email}
            </option>
          ))}
        </select>
      </div>
    ) : null;
  } else {
    return allUsers.length > 0 ? (
      <div className="search-container">
        <select
          className="search-bar"
          value={selectedUser.email}
          data-testid="select-userTest"
          onChange={handleSearchChange}
        >
          <option />
          {options.map(opt => (
            <option key={opt.label} data-testid="optionUser-test" value={opt.label}>
              {opt.value.email}
            </option>
          ))}
        </select>
        <SearchItem user={selectedUser} />
        <SearchLists user={selectedUser} />
      </div>
    ) : null;
  }
};

export default Search;
