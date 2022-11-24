import './Header.css';

export const Header = (): JSX.Element => {
  return (
    <nav className="header">
      <img
        src="https://static.wixstatic.com/media/3dbed1_4a14f7c810ff4d40ae1be96c5c171caa~mv2.png/v1/fill/w_541,h_168,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ifGift.png"
        className="header-logo"
        alt="ifGift logo"
      />
    </nav>
  );
};

export default Header;
