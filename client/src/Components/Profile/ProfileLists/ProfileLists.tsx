import { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import './ProfileLists.css';

import { UserContext } from '../../../context/UserContext';
import { IUser } from '../../../types/app-types';

export const ProfileLists = (): JSX.Element => {
  const userCtx = useContext(UserContext);
  const [wantListText, setWantListText] = useState('');
  const [avoidListText, setAvoidListText] = useState('');
  const [charityListText, setCharityListText] = useState('');
  const [registryListText, setRegistryListText] = useState('');

  useEffect(() => {
    if (userCtx?.userInfo) {
      if (userCtx.userInfo.wantList) setWantListText(userCtx.userInfo.wantList);
      if (userCtx.userInfo.avoidList) setAvoidListText(userCtx.userInfo.avoidList);
      if (userCtx.userInfo.charityList) setCharityListText(userCtx.userInfo.charityList);
      if (userCtx.userInfo.registryList) setRegistryListText(userCtx.userInfo.registryList);
    }
  }, [userCtx]);

  const ListHandler = async (property: string, ctxList: string) => {
    if (userCtx?.userInfo && ctxList !== '' && userCtx.userInfo[property as keyof IUser] !== ctxList) {
      const userToUpdate = { ...userCtx.userInfo };
      userToUpdate[property as keyof IUser] = ctxList;

      await userCtx.updateUserInfo(userToUpdate);
    }
  };

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
                <textarea
                  className="profile-list-text"
                  name="wantList"
                  data-testid="wantListTextArea"
                  value={wantListText}
                  onChange={e => setWantListText(e.target.value)}
                  cols={30}
                  rows={10}
                ></textarea>
                <button
                  className="save-change-btn"
                  data-testid="btnWantList"
                  disabled={wantListText === ''}
                  onClick={() => void ListHandler('wantList', wantListText)}
                >
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
                <textarea
                  className="profile-list-text"
                  name="avoidList"
                  data-testid="avoidListTextArea"
                  value={avoidListText}
                  onChange={e => setAvoidListText(e.target.value)}
                  cols={30}
                  rows={10}
                ></textarea>
                <button
                  className="save-change-btn"
                  data-testid="btnAvoidList"
                  disabled={avoidListText === ''}
                  onClick={() => void ListHandler('avoidList', avoidListText)}
                >
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
                <textarea
                  className="profile-list-text"
                  value={charityListText}
                  name="charityList"
                  data-testid="charityListTextArea"
                  onChange={e => setCharityListText(e.target.value)}
                  cols={30}
                  rows={10}
                ></textarea>
                <button
                  className="save-change-btn"
                  data-testid="btnCharityList"
                  disabled={charityListText !== ''}
                  onClick={() => void ListHandler('charityList', charityListText)}
                >
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
                <textarea
                  className="profile-list-text"
                  value={registryListText}
                  onChange={e => setRegistryListText(e.target.value)}
                  name="registryList"
                  data-testid="registryListTextArea"
                  cols={30}
                  rows={10}
                ></textarea>
                <button
                  className="save-change-btn"
                  data-testid="btnRegistryList"
                  onClick={() => void ListHandler('registryList', registryListText)}
                  disabled={registryListText === ''}
                >
                  Save Changes
                </button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProfileLists;
