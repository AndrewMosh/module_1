import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import Button from '@components/UI/Button/Button';
import { menu } from './menu.consts';
import useMenuStore from '@store/menuStore/useMenuStore';

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          NeoBank
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <button
            className="header__close"
            aria-label="Close Menu"
            onClick={closeMenu}
          >
            ✕
          </button>
          <ul className="header__list">
            {menu.map((item) => (
              <li key={item.id} className="header__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'header__link header__link--active'
                      : 'header__link'
                  }
                  to={item.link}
                  onClick={closeMenu}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button className="header__button"> Online bank</Button>
        <button
          className="header__menu"
          aria-label="Open Menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
