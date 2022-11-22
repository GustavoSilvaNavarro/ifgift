import { useState, useContext } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import './MyListItem.css';

import { IList } from '../../../types/app-types';
import { updateList, deleteList, getListsByUserId } from '../../../services/list-services';
import { UserContext } from '../../../context/UserContext';

interface IProps {
  myList: IList;
  setAllMyLists: React.Dispatch<React.SetStateAction<IList[]>>;
}

function MyListItem({ myList, setAllMyLists }: IProps): JSX.Element {
  const userCtx = useContext(UserContext);
  const [myListName, setMyListName] = useState(myList.title ? myList.title : '');
  const [myListUsername, setMyListUsername] = useState(myList.recipient ? myList.recipient : '');
  const [myListText, setMyListText] = useState(myList.text ? myList.text : '');

  const getArrayOfLists = async (userId: string) => {
    const updateLists = await getListsByUserId(userId);
    if (updateLists) setAllMyLists(updateLists);
  };

  const updateListHandler = async () => {
    if (userCtx && userCtx.userInfo && userCtx.userInfo._id) {
      const listData = {
        createdBy: userCtx.userInfo._id,
        recipient: myListUsername,
        title: myListName,
        text: myListText,
      };

      if (myList._id) {
        const newList = await updateList(myList._id, listData);
        if (newList) {
          await getArrayOfLists(userCtx.userInfo._id);
        }
      }
    }
  };

  const removeFromList = async () => {
    if (myList._id) {
      const listDeleted = await deleteList(myList._id);

      if (listDeleted === 'Deleted') {
        if (userCtx && userCtx.userInfo) {
          if (userCtx.userInfo._id) {
            await getArrayOfLists(userCtx.userInfo._id);
          }
        }
      }
    }
  };

  const options = [
    { value: 'joshyjosh', label: 'joshyjosh' },
    { value: 'kevykev', label: 'kevykev' },
    { value: 'frannyfran', label: 'frannyfran' },
  ];

  return (
    <Accordion className="list-container" allowToggle>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h1>
              <AccordionButton className="acc-btn">
                <Box className="list-title">
                  <h1 className="list-recipient">{myListName}</h1>
                  <h2 className="recipient-username">{myListUsername}</h2>
                </Box>
                <button className="trash-btn" onClick={() => void removeFromList()}>
                  &#x1F5D1;
                </button>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" className="plus-minus-btn" />
                ) : (
                  <AddIcon fontSize="12px" className="plus-minus-btn" />
                )}
              </AccordionButton>
            </h1>
            <AccordionPanel className="list-page">
              <div className="note-top"></div>
              <div className="title-edit-box">
                <input
                  className="list-recipient-edit"
                  type="text"
                  value={myListName}
                  onChange={e => setMyListName(e.target.value)}
                  placeholder="Title: What is this list for?"
                />
                <select
                  className="list-username-edit"
                  value={myListUsername}
                  onChange={e => setMyListUsername(e.target.value)}
                  placeholder="Which friend?"
                >
                  <option />
                  {options.map(opt => (
                    <option key={opt.label} value={opt.value}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className="profile-list-text"
                value={myListText}
                onChange={e => setMyListText(e.target.value)}
                cols={30}
                rows={10}
              ></textarea>
              <button className="save-change-btn" onClick={() => void updateListHandler()}>
                Save Changes
              </button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default MyListItem;
