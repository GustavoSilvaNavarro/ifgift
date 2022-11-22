import { useEffect } from 'react';
import { addUser } from '../../services/user-service';
import { useAuth0, User } from '@auth0/auth0-react';

import './Home.css';

import { IUser } from '../../types/app-types';

const Home = (): JSX.Element => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      void verifyUser(user);
    }
  }, [user]);

  const verifyUser = async (user: User) => {
    const currentUser = (await addUser({ email: user.email as string })) as unknown as {
      newUser: IUser;
      token: string;
    };
    localStorage.setItem('accessToken', currentUser.token);
  };

  return (
    <div>
      <h1>Upcoming Holidays</h1>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
