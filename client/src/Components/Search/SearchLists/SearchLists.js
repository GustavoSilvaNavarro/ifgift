import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import ContentEditable from 'react-contenteditable';

import './SearchLists.css';

function SearchLists(props) {
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
                  className="list-text"
                  html={props.wantList ? props.wantList : ''}
                  value={props.wantList}
                  contentEditable={false}
                />
                {/* <div>{props.wantList}</div> */}
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
                  className="list-text"
                  html={props.avoidList ? props.avoidList : ''}
                  value={props.avoidList}
                  contentEditable={false}
                />
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
                  className="list-text"
                  html={props.charityList ? props.charityList : ''}
                  value={props.charityList}
                  contentEditable={false}
                />
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
                  className="list-text"
                  html={props.registryList ? props.registryList : ''}
                  value={props.registryList}
                  contentEditable={false}
                />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default SearchLists;
