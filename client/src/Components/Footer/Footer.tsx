import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

library.add(fas);

const glassLookup: IconLookup = { prefix: 'fas', iconName: 'magnifying-glass' };
const glassIconDefinition: IconDefinition = findIconDefinition(glassLookup);

const rectangleLookup: IconLookup = { prefix: 'fas', iconName: 'rectangle-list' };
const rectangleIconDefinition: IconDefinition = findIconDefinition(rectangleLookup);

const idCardLookup: IconLookup = { prefix: 'fas', iconName: 'id-card' };
const idCardIconDefinition: IconDefinition = findIconDefinition(idCardLookup);

function Footer(): JSX.Element {
  return (
    <nav className="footer">
      <Link to="/search" className="nav-btn">
        <FontAwesomeIcon icon={glassIconDefinition} />
        <span className="btn-name">search</span>
      </Link>
      <Link to="/mylists" className="nav-btn">
        <FontAwesomeIcon icon={rectangleIconDefinition} />
        <span className="btn-name">lists</span>
      </Link>
      <Link to="/" className="nav-btn">
        <FontAwesomeIcon icon={idCardIconDefinition} />
        <span className="btn-name">profile</span>
      </Link>
    </nav>
  );
}

export default Footer;
