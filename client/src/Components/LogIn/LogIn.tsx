import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './LogIn.css';

import { useNavigate } from 'react-router';

const LogIn = () => {
  const navigate = useNavigate();
  const { loginWithPopup, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="from-box">
          <h2>From:</h2>
          <img
            src="https://static.wixstatic.com/media/3dbed1_4a14f7c810ff4d40ae1be96c5c171caa~mv2.png/v1/fill/w_541,h_168,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ifGift.png"
            className="logo"
            alt="ifGift logo"
          />
        </div>
        <div className="to-box">
          <h2>To:</h2>
          <h2 className="you">You!</h2>
        </div>
        <p className="question">Don&#39;t know what to get that special someone?</p>
        <ul className="function-list">
          <li>Check their ifGift want list!</li>
          <li>Keep your own lists of gifting ideas for all the special folks in your life.</li>
        </ul>
        <p className="ifgift-copy">Unwrap the better way to give.</p>
        <button
          onClick={() => {
            void loginWithPopup();
          }}
          type="button"
          className="login-btn"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LogIn;
