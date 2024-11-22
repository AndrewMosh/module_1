import "./Header.scss";
import { Link } from "react-router-dom";
import Button from "@components/UI/Button/Button";
import { menu } from "./menu.utils";

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">NeoBank</Link>
                <nav className="header__nav">
                    <ul className="header__list">
                        {menu.map((item) => (
                            <li key={item.id} className="header__item">
                                <Link className="header__link" to={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Button children="Online Bank" className="header__button" />
                <button className="header__menu" aria-label="Menu">
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;
