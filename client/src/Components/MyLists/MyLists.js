import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

import MyListItem from './MyListItem/MyListItem';
import { addToMyLists, getListsByUserId } from '../../Services/listService';
import { getUserInfo } from '../../Services/profileService';

import './MyLists.css';

library.add(faFileCirclePlus);

const MyLists = () => {
  const [allMyLists, setAllMyLists] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUserId().then(getListsByUserId(userId).then(lists => setAllMyLists(lists), console.log('LOG', allMyLists)));
  }, []);

  async function getUserId() {
    const accessToken = localStorage.getItem('accessToken');
    const fetchedUser = await getUserInfo(accessToken);
    await setUserId(fetchedUser._id);
  }

  async function createNewList() {
    await addToMyLists(userId);
    getListsByUserId(userId).then(lists => {
      setAllMyLists(lists);
    });
  }

  if (allMyLists && allMyLists.length) {
    return (
      <div className="myList-container">
        <button className="create-list-btn" onClick={createNewList}>
          <FontAwesomeIcon icon="fa-solid fa-file-circle-plus" />
        </button>
        <h1 className="container-title">MyLists</h1>
        {allMyLists.map(list => (
          <MyListItem
            key={list._id}
            myList={list}
            id={list._id}
            title={list.title}
            username={list.userName}
            text={list.text}
            allMyLists={allMyLists}
            setAllMyLists={setAllMyLists}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="myList-container">
        <button className="create-list-btn" onClick={createNewList}>
          <FontAwesomeIcon icon="fa-solid fa-file-circle-plus" />
        </button>
        <h1 className="container-title">MyLists</h1>
        <div className="arrow-container">
          <div className="arrow down">down</div>
        </div>
      </div>
    );
  }
};

export default MyLists;
