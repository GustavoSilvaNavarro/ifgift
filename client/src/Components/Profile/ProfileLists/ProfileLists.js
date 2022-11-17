import { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useRef } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import './ProfileLists.css';

import { updateUser, getUserInfo } from '../../../Services/profileService';

function ProfileLists() {
  const [wantListText, setWantListText] = useState('');
  const [avoidListText, setAvoidListText] = useState('');
  const [charityListText, setCharityListText] = useState('');
  const [registryListText, setRegistryListText] = useState('');
  const wantsRef = useRef();
  const avoidsRef = useRef();
  const charityRef = useRef();
  const registryRef = useRef();

  useEffect(() => {
    getProfileLists();
  }, []);

  const getProfileLists = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const fetchedUser = await getUserInfo(accessToken);
    setWantListText(fetchedUser.wantList);
    setAvoidListText(fetchedUser.avoidList);
    setCharityListText(fetchedUser.charityList);
    setRegistryListText(fetchedUser.registryList);
  };

  function handleWantListChange(e) {
    e.preventDefault();
    const wantList = wantListText;
    updateUser({ wantList });
  }

  function handleAvoidListChange(e) {
    e.preventDefault();
    const avoidList = avoidListText;
    updateUser({ avoidList });
  }

  function handleCharityListChange(e) {
    e.preventDefault();
    const charityList = charityListText;
    updateUser({ charityList });
  }

  function handleRegistryListChange(e) {
    e.preventDefault();
    const registryList = registryListText;
    updateUser({ registryList });
  }

  return (
    <>
      <Accordion className="profile-list-container" allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h1>
                <AccordionButton className="want-acc-btn">
                  <Box className="profile-list-title">
                    <h1 className="profile-list-recipient">Want List</h1>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" className="plus-minus-btn" />
                  ) : (
                    <AddIcon fontSize="12px" className="plus-minus-btn" />
                  )}
                </AccordionButton>
              </h1>
              <AccordionPanel className="profile-list-page">
                <div className="note-top"></div>
                <ContentEditable
                  className="profile-list-text"
                  innerRef={wantsRef}
                  tagName="div"
                  html={wantListText ? wantListText : ''}
                  onChange={e => {
                    const html = e.target.value;
                    setWantListText(html);
                  }}
                  value={wantListText}
                />
                <button className="save-change-btn" onClick={handleWantListChange}>
                  Save Changes
                </button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h1>
                <AccordionButton className="avoid-acc-btn">
                  <Box className="list-title">
                    <h1 className="profile-list-recipient">Avoid List</h1>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" className="plus-minus-btn" />
                  ) : (
                    <AddIcon fontSize="12px" className="plus-minus-btn" />
                  )}
                </AccordionButton>
              </h1>
              <AccordionPanel className="list-page">
                <div className="note-top"></div>
                <ContentEditable
                  className="profile-list-text"
                  innerRef={avoidsRef}
                  tagName="div"
                  html={avoidListText ? avoidListText : ''}
                  onChange={e => {
                    const html = e.target.value;
                    setAvoidListText(html);
                  }}
                />
                <button className="save-change-btn" onClick={handleAvoidListChange}>
                  Save Changes
                </button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h1>
                <AccordionButton className="charity-acc-btn">
                  <Box className="list-title">
                    <h1 className="profile-list-recipient">Charity List</h1>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" className="plus-minus-btn" />
                  ) : (
                    <AddIcon fontSize="12px" className="plus-minus-btn" />
                  )}
                </AccordionButton>
              </h1>
              <AccordionPanel className="list-page">
                <div className="note-top"></div>
                <ContentEditable
                  className="profile-list-text"
                  innerRef={charityRef}
                  tagName="div"
                  html={charityListText ? charityListText : ''}
                  onChange={e => {
                    const html = e.target.value;
                    setCharityListText(html);
                  }}
                />
                <button className="save-change-btn" onClick={handleCharityListChange}>
                  Save Changes
                </button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h1>
                <AccordionButton className="registry-acc-btn">
                  <Box className="list-title">
                    <h1 className="profile-list-recipient">Registry List</h1>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" className="plus-minus-btn" />
                  ) : (
                    <AddIcon fontSize="12px" className="plus-minus-btn" />
                  )}
                </AccordionButton>
              </h1>
              <AccordionPanel className="list-page">
                <div className="note-top"></div>
                <ContentEditable
                  className="profile-list-text"
                  innerRef={registryRef}
                  tagName="div"
                  html={registryListText ? registryListText : ''}
                  onChange={e => {
                    const html = e.target.value;
                    setRegistryListText(html);
                  }}
                />
                <button className="save-change-btn" onClick={handleRegistryListChange}>
                  Save Changes
                </button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default ProfileLists;
