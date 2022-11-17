import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import ContentEditable from 'react-contenteditable';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import { updateList, deleteList } from '../../../Services/listService';
import { getUserInfo } from '../../../Services/profileService';

import './MyListItem.css';

function MyListItem(props) {
  const [myListName, setMyListName] = useState('');
  const [myListUsername, setMyListUsername] = useState('');
  const [myListText, setMyListText] = useState('');
  // const [created, setCreated] = useState(false)
  const [userId, setUserId] = useState('');
  const listRef = useRef();

  useEffect(() => {
    getUserId();
    getListInfo();
  }, []);

  function getListInfo() {
    setMyListName(props.title);
    setMyListText(props.text);
    setMyListUsername(props.username);
  }

  function handleMyListNameChange(e) {
    setMyListName(e.target.value);
  }

  function handleMyListUsernameChange(e) {
    setMyListUsername(e.value);
  }

  function handleListChanges() {
    const createdBy = userId;
    const title = myListName;
    const recipient = myListUsername;
    const text = myListText;
    const lastEdited = Date.now.toISOString;
    const newMyList = { createdBy, title, recipient, text, lastEdited };
    updateList(props.myList._id, newMyList);
  }

  const getUserId = async () => {
    const accessToken = await localStorage.getItem('accessToken');
    const fetchedUser = await getUserInfo(accessToken);
    setUserId(fetchedUser._id);
  };

  const removeList = async () => {
    deleteList(props.myList._id);
    const newLists = props.allMyLists.filter(list => list._id !== props.myList._id);
    props.setAllMyLists(newLists);
  };

  const options = [
    { value: 'joshyjosh', label: 'joshyjosh' },
    { value: 'kevykev', label: 'kevykev' },
    { value: 'frannyfran', label: 'frannyfran' },
  ];

  const selectStyle = {
    control: styles => ({ ...styles, background: 'none', border: 'none', zindex: '150' }),
  };

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
                <button className="trash-btn" onClick={removeList}>
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
                  onChange={handleMyListNameChange}
                  placeholder="Title: Who is this list for?"
                />
                <Select
                  className="list-username-edit"
                  styles={selectStyle}
                  options={options}
                  value={myListUsername}
                  onChange={e => handleMyListUsernameChange(e)}
                  placeholder="Which friend?"
                />
              </div>
              <ContentEditable
                className="list-text"
                innerRef={listRef}
                tagName="div"
                html={myListText ? myListText : ''}
                onChange={e => {
                  const html = e.target.value;
                  setMyListText(html);
                }}
                value={myListText}
              />
              <button className="save-change-btn" onClick={handleListChanges}>
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
