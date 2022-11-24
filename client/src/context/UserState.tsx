import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { UserContext } from './UserContext';
import { addUser, updateUser } from '../services/user-service';
import { IUser } from '../types/app-types';

export const UserState = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      void addUser({ email: user.email }).then(data => {
        if (data) {
          setUserInfo(data.userExist);
          localStorage.setItem('accessToken', data.token);
        }
      });
    }
  }, [isAuthenticated, user]);

  const updateUserInfo = async (updatedUser: IUser) => {
    const user = await updateUser(updatedUser);
    if (user && user.email) {
      setUserInfo(user);
    }
  };

  return <UserContext.Provider value={{ userInfo, updateUserInfo }}>{children}</UserContext.Provider>;
};
