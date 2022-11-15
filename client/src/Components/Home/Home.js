import { useState, useEffect } from 'react';
import { addUser } from '../../Services/profileService';
import { useAuth0 } from '@auth0/auth0-react';

import './Home.css';

const Home = () => {
  const {user} = useAuth0();
  // const [recentLists, setRecentLists] = useState([]);

  
  useEffect(() => {
    verifyUser(user);
  }, []);

  const verifyUser = async (user) => {
    const currentUser = await addUser({email: user.email});
    localStorage.setItem('accessToken', currentUser.token);
  } 
  
  // useEffect(() => {
  //   getRecentLists().then(lists => setRecentLists(lists));
  // }, []);

  return (
    <div>
      <h1>Upcoming Holidays</h1>
      <h1>Home</h1>
    </div>
  )
};

export default Home;