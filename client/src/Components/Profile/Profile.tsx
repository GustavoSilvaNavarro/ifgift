import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Profile.css';

import { UserContext } from '../../context/UserContext';
import ProfileLists from './ProfileLists/ProfileLists';
import LogOutButton from '../LogOutButton/LogOutButton';

library.add(fas);

const penLookup: IconLookup = { prefix: 'fas', iconName: 'pen' };
const penIconDefinition: IconDefinition = findIconDefinition(penLookup);

export const Profile = (): JSX.Element | null => {
  const userCtx = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const dateFormatter = (dateObj: string) => {
    const date = new Date(dateObj);
    const month = date.toLocaleString('en-US', { month: 'long' });
    return `${date.getDate()} ${month}`;
  };

  if (isLoading) return <div data-testid="profileLoader">Loading ...</div>;

  return isAuthenticated && userCtx?.userInfo ? (
    <div className="profile-container">
      <div className="main-profile-box">
        <div className="img-box">
          <img
            className="profile-img"
            data-testid="userImgTest"
            src={
              user && user.picture
                ? user.picture
                : 'https://i.pinimg.com/originals/4b/4b/5e/4b4b5e5370d0888937788489a3923f24.jpg'
            }
            alt="profileimg"
          />
          {/* <div className="gift-preference-title">Gift Preference:</div> */}
          {/* <div className="gift-preference">{userData.giftPref}</div> */}
        </div>
        <div className="profile-info-box">
          <div className="profile-name" data-testid="testProfileName">
            {userCtx.userInfo.name}
          </div>
          <div className="username" data-testid="testUserName">
            @{userCtx.userInfo.userName}
          </div>
          <div className="pronouns" data-testid="testPronouns">
            {userCtx.userInfo.pronouns}
          </div>
          <div className="email" data-testid="testEmail">
            {userCtx.userInfo.email}
          </div>
          <div className="address" data-testid="testAddress">
            {userCtx.userInfo.address}
          </div>
          <div className="birthday" data-testid="testBirthday">
            born: {dateFormatter(userCtx.userInfo.birthday ? userCtx.userInfo.birthday : '')}
          </div>
        </div>
        <LogOutButton />
        <Link to="/editprofile" className="edit-btn">
          <FontAwesomeIcon icon={penIconDefinition} title="edit profile" />
        </Link>
      </div>
      <div className="profile-list-box">
        <ProfileLists />
      </div>
    </div>
  ) : null;
};

export default Profile;
