import Select from 'react-select';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import './Search.css';

import SearchItem from './SearchItem/SearchItem';
import SearchLists from './SearchLists/SearchLists';
import { getAllUsers } from '../../Services/profileService';

const selectStyle = {
  control: styles => ({ ...styles, background: 'none', border: 'none', zindex: '150', width: '100%' }),
};

const Search = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  function handleSearchChange(e) {
    setSelectedUser(e.value);
  }

  useEffect(() => {
    getAllUsers().then(users => {
      const options = users.map(user => ({ value: user, label: user.name }));
      setOptions(options);
      setAllUsers(users);
    });
  }, []);

  if (!selectedUser) {
    return (
      allUsers.length && (
        <div className="search-container">
          <Select
            className="search-bar"
            options={options}
            styles={selectStyle}
            placeholder="Search ifGift users..."
            onChange={handleSearchChange}
          ></Select>
        </div>
      )
    );
  } else {
    return (
      allUsers.length && (
        <div className="search-container">
          <Select
            className="search-bar"
            options={options}
            styles={selectStyle}
            placeholder="Search ifGift users..."
            onChange={handleSearchChange}
          ></Select>
          <SearchItem
            name={selectedUser.name}
            username={selectedUser.username}
            pronouns={selectedUser.pronouns}
            email={selectedUser.email}
            address={selectedUser.address}
            birthday={selectedUser.birthday}
            giftPref={selectedUser.giftPref}
          />
          <SearchLists
            wantList={selectedUser.wantList}
            avoidList={selectedUser.avoidList}
            charityList={selectedUser.charityList}
            registryList={selectedUser.registryList}
          />
        </div>
      )
    );
  }
};

export default Search;
