import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import './SearchLists.css';
import { IUser } from '../../../types/app-types';

export const SearchLists = ({ user }: { user: IUser }): JSX.Element => {
  return (
    <>
      <Accordion className="profile-list-container" aria-label="listContainerTest" allowToggle>
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
                <p className="list-text" data-testid="search-wantListTest">
                  {user.wantList}
                </p>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" aria-label="listContainerTest" allowToggle>
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
                <p className="list-text" data-testid="search-avoidListTest">
                  {user.avoidList}
                </p>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" aria-label="listContainerTest" allowToggle>
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
                <p className="list-text" data-testid="search-charityListTest">
                  {user.charityList}
                </p>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Accordion className="profile-list-container" aria-label="listContainerTest" allowToggle>
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
                <p className="list-text" data-testid="search-registryListTest">
                  {user.registryList}
                </p>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SearchLists;
