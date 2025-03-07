import { IUser } from '../../../types/app-types';

import './SearchItem.css';

export const SearchItem = ({ user }: { user: IUser }): JSX.Element => {
  const dateFormatter = (dateObj: string) => {
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
          <div className="gift-pref">{user.giftPref}</div>
        </div>
        <div className="result-info-box">
          <div className="result-profile-name" aria-label="testNameId">
            {user.name}
          </div>
          <div className="result-username" aria-label="testUserNameId">
            @{user.userName}
          </div>
          <div className="result-pronouns" aria-label="testPronounsId">
            {user.pronouns}
          </div>
          <div className="result-email" aria-label="testEmailId">
            {user.email}
          </div>
          <div className="result-address" aria-label="testAddressId">
            {user.address}
          </div>
          <div className="result-birthday" aria-label="testBirthdayId">
            born: {dateFormatter(user.birthday ? user.birthday : '')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
