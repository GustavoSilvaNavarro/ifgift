import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import './Profile.css';

import ProfileLists from './ProfileLists/ProfileLists';
import LogOutButton from '../LogOutButton/LogOutButton';
import { getUserInfo, addUser } from '../../Services/profileService';

library.add(faPen);

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    verifyUser(user);
    getUserData();
  }, []);

  const verifyUser = async user => {
    const currentUser = await addUser({ email: user.email });
    localStorage.setItem('accessToken', currentUser.token);
  };

  const getUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchedUser = await getUserInfo(accessToken);
    setFetched(true);
    setUserData(fetchedUser);
  };

  const dateFormatter = dateObj => {
    const date = new Date(dateObj);
    const month = date.toLocaleString('en-US', { month: 'long' });
    return `${date.getDate()} ${month}`;
  };

  if (isLoading && fetched) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="main-profile-box">
          <div className="img-box">
            <img
              className="profile-img"
              src={
                user.picture
                  ? user.picture
                  : 'https://i.pinimg.com/originals/4b/4b/5e/4b4b5e5370d0888937788489a3923f24.jpg'
              }
              alt="profileimg"
            />
            <div className="gift-preference-title">Gift Preference:</div>
            <div className="gift-preference">{userData.giftPref}</div>
          </div>
          <div className="profile-info-box">
            <div className="profile-name">{userData.name}</div>
            <div className="username">@{userData.userName}</div>
            <div className="pronouns">{userData.pronouns}</div>
            <div className="email">{userData.email}</div>
            <div className="address">{userData.address}</div>
            <div className="birthday">born: {dateFormatter(userData.birthday)}</div>
          </div>
          <LogOutButton />
          <Link to="/editprofile" className="edit-btn">
            <FontAwesomeIcon icon="fa-solid fa-pen" title="edit profile" />
          </Link>
        </div>
        <div className="profile-list-box">
          <ProfileLists />
        </div>
      </div>
    )
  );
};

export default Profile;
