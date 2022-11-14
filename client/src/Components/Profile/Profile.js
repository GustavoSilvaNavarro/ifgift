import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import './Profile.css';

import ProfileLists from './ProfileLists/ProfileLists';
import LogOutButton from '../LogOutButton/LogOutButton';

library.add(faPen)


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="main-profile-box">
          <div className="img-box">
            <img className="profile-img"
            // src={user.picture}
              src={"https://images.theconversation.com/files/313683/original/file-20200205-149738-1bmqilf.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"}
              alt="profileimg"/>
            <div className="gift-preference-title">Gift Preference:</div>
            <div className="gift-preference">Charitable Donation</div>
          </div>
          <div className="profile-info-box">
            <div className="profile-name">{user.name}</div>
            <div className="pronouns">he/him/his</div>
            <div className="email">{user.email}</div>
            <div className="address">1212 Gift Street San Diego, CA USA</div>
            <div className="birthday">08/23</div>
            <div className="holidays"></div>
            <LogOutButton />
          </div>
            <Link to="/editprofile" className="edit-btn"><FontAwesomeIcon icon="fa-solid fa-pen" title="edit profile" /></Link>
        </div>
        <div className="profile-list-box">
          <ProfileLists />
        </div>
      </div>
    )
  )
};

export default Profile;