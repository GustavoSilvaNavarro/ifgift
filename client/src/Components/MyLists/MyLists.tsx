import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './MyLists.css';

import MyListItem from './MyListItem/MyListItem';
import { addToMyLists, getListsByUserId } from '../../services/list-services';
import { IList } from '../../types/app-types';
import { UserContext } from '../../context/UserContext';

library.add(fas);

const fileCirclePlusLookup: IconLookup = { prefix: 'fas', iconName: 'file-circle-plus' };
const fileCirclePlusIconDefinition: IconDefinition = findIconDefinition(fileCirclePlusLookup);

export const MyLists = (): JSX.Element => {
  const userCtx = useContext(UserContext);
  const [allMyLists, setAllMyLists] = useState([] as IList[]);

  useEffect(() => {
    if (userCtx?.userInfo?._id) {
      void getListsByUserId(userCtx.userInfo._id).then(lists => {
        if (lists && lists.length > 0) setAllMyLists(lists);
      });
    }
  }, [userCtx]);

  const createNewList = async () => {
    if (userCtx?.userInfo?._id) {
      const list = await addToMyLists(userCtx.userInfo._id);
      if (list) {
        setAllMyLists(prevList => [...prevList, list]);
      }
    }
  };

  if (allMyLists && allMyLists.length > 0) {
    return (
      <div className="myList-container">
        <button className="create-list-btn" data-testid="btnAddToListTest" onClick={() => void createNewList()}>
          <FontAwesomeIcon icon={fileCirclePlusIconDefinition} />
        </button>
        <h1 className="container-title">MyLists</h1>
        {allMyLists.map(list => (
          <MyListItem key={list._id} myList={list} setAllMyLists={setAllMyLists} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="myList-container">
        <button className="create-list-btn" onClick={() => void createNewList()}>
          <FontAwesomeIcon icon={fileCirclePlusIconDefinition} />
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
