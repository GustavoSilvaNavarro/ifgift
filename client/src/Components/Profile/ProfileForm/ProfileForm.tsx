import { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import './ProfileForm.css';

import { UserContext } from '../../../context/UserContext';
import { IUser } from '../../../types/app-types';

const initialState = {
  address: '',
  birthday: '',
  giftPref: 'Gifts from My Want List',
  email: '',
  name: '',
  pronouns: '',
  userName: '',
};

export const ProfileForm = (): JSX.Element | null => {
  const userCtx = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  console.log(state);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userCtx && userCtx.userInfo && userCtx.userInfo.email) {
      const userToUpdate = { ...state } as IUser;
      const birthdayIso = new Date(state.birthday).toISOString(); // check
      userToUpdate.email = userCtx.userInfo.email;
      userToUpdate.birthday = birthdayIso;

      await userCtx.updateUserInfo(userToUpdate);
      navigate('/');
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && userCtx?.userInfo ? (
    <form className="profile-input-form" onSubmit={e => void submitHandler(e)}>
      <h1 className="form-title">Edit Your Profile</h1>
      <h2 className="input-title">name:</h2>
      <input
        required
        name="name"
        id="name"
        onChange={handleChange}
        className="name-input"
        type="text"
        placeholder="your name..."
      />
      <h2 className="input-title">username:</h2>
      <input
        required
        name="userName"
        onChange={handleChange}
        className="name-input"
        type="text"
        placeholder="create a username..."
      />
      <h2 className="input-title">pronouns:</h2>
      <input
        onChange={handleChange}
        name="pronouns"
        className="name-input"
        type="text"
        placeholder="your pronouns..."
      />
      <h2 className="input-title">e-mail:</h2>
      <p>{user && user.email ? user.email : 'example@test.com'}</p>
      <h2 className="input-title">birthday:</h2>
      <input
        min={new Date().toISOString().slice(0, -8)}
        onChange={handleChange}
        name="birthday"
        className="date-input"
        type="date"
      />
      <h2 className="input-title">address:</h2>
      <input
        name="address"
        onChange={handleChange}
        className="address-input"
        type="text"
        placeholder="1212 Give Better Blvd. Ifsburg, Giftesota, USA"
      />
      <h2 className="input-title">my gift preference:</h2>
      <select required name="giftPref" value={state.giftPref} onChange={handleChange} className="gift-pref-select">
        <option value="Gifts from My Want List">My Want List</option>
        <option value="Gifts from My Registries">My Registries</option>
        <option value="Charitable Donations">Charitable Donations</option>
      </select>
      <button className="save-btn" type="submit">
        Save Changes
      </button>
    </form>
  ) : null;
};
