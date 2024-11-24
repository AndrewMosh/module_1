import logo from "@assets/svg/logo.svg";
import "./Footer.scss";
import { fMenu, contacts, cookiesInfo } from "./menu-footer.utils";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__header">
                    <img src={logo} alt="logo" />
                    <div className="footer__adresses">
						{contacts.map((contact) => (
							<div key={contact.id}>
								<Link to={contact.link} className={contact.flag === 'email' ? 'footer__email' : 'footer__phone'}>
									{contact.name}
								</Link>
							</div>
						))}
                    </div>
                </div>
                <ul className="footer__list">
                    {fMenu.map((item) => (
                        <li key={item.id} className="footer__item">
                            <Link to={item.link} className="footer__link">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <hr className="footer__line" />
                <div className="footer__cookies">
                    {cookiesInfo}
                </div>
            </div>
        </footer>
    );
};
