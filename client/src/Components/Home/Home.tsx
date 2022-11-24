import { useEffect } from 'react';
import { addUser } from '../../services/user-service';
import { useAuth0, User } from '@auth0/auth0-react';

import './Home.css';

const Home = (): JSX.Element => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      void verifyUser(user);
    }
  }, [user]);

  const verifyUser = async (user: User) => {
    if (user?.email) {
      const currentUser = await addUser({ email: user.email });
      if (currentUser?.token) localStorage.setItem('accessToken', currentUser.token);
    }
  };

  return (
    <div>
      <h1>Upcoming Holidays</h1>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
