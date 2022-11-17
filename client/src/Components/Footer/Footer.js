import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faComments,
  faGift,
  faMagnifyingGlass,
  faRectangleList,
  faUsers,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

library.add(faComments, faGift, faRectangleList, faUsers, faIdCard, faMagnifyingGlass);

function Footer() {
  return (
    <nav className="footer">
      <Link to="/search" className="nav-btn">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        <span className="btn-name">search</span>
      </Link>
      <Link to="/mylists" className="nav-btn">
        <FontAwesomeIcon icon="fa-solid fa-rectangle-list" />
        <span className="btn-name">lists</span>
      </Link>
      <Link to="/friends" className="nav-btn">
        <FontAwesomeIcon icon="fa-solid fa-users" />
        <span className="btn-name">friends</span>
      </Link>
      <Link to="/" className="nav-btn">
        <FontAwesomeIcon icon="fa-solid fa-id-card" />
        <span className="btn-name">profile</span>
      </Link>
    </nav>
  );
}

export default Footer;
