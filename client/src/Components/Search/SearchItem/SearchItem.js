// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import { useState, useEffect } from 'react';
// import { getUserInfo } from '../../../Services/profileService';

import './SearchItem.css';

library.add(faUserPlus);

const SearchItem = props => {
  const dateFormatter = dateObj => {
    const date = new Date(dateObj);
    const month = date.toLocaleString('en-US', { month: 'long' });
    return `${date.getDate()} ${month}`;
  };

  return (
    <div className="search-result-container">
      <div className="result-profile-box">
        <div className="search-pic-box">
          <img
            className="search-pic"
            src="https://i.pinimg.com/originals/4b/4b/5e/4b4b5e5370d0888937788489a3923f24.jpg"
            alt="profileimg"
          />
          <div className="gift-pref-title">Gift Preference:</div>
          <div className="gift-pref">{props.giftPref}</div>
        </div>
        <div className="result-info-box">
          <div className="result-profile-name">{props.name}</div>
          <div className="result-username">@{props.username}</div>
          <div className="result-pronouns">{props.pronouns}</div>
          <div className="result-email">{props.email}</div>
          <div className="result-address">{props.address}</div>
          <div className="result-birthday">born: {dateFormatter(props.birthday)}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
