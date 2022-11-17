// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIdCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

library.add(faIdCard, faMagnifyingGlass);

function Header() {
  return (
    <nav className="header">
      {/* <Link to="/search" className="profile-btn">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          <span className="btn-name">search</span>
        </Link> */}

      <img
        src="https://static.wixstatic.com/media/3dbed1_4a14f7c810ff4d40ae1be96c5c171caa~mv2.png/v1/fill/w_541,h_168,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ifGift.png"
        className="header-logo"
        alt="ifGift logo"
      />

      {/* <Link to="/" className="profile-btn">
          <FontAwesomeIcon icon="fa-solid fa-id-card" />
          <span className="btn-name">profile</span>
        </Link> */}
    </nav>
  );
}

export default Header;
