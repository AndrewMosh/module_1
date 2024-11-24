import logo from "@assets/svg/logo.svg";
import "./Footer.scss";
import { fMenu } from "./menu-footer.utils";
import { Link } from "react-router-dom";

export const Footer = () => {
	const email: string = 'info@neoflex.ru'
	const phone: string = '+7 (495) 984 25 13'
	const cookies: string = 'We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings'
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__header">
                    <img src={logo} alt="logo" />
                    <div className="footer__adresses">
                        <div className="footer__phone">{phone}</div>
                        <div className="footer__email">{email}</div>
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
                    {cookies}
                </div>
            </div>
        </footer>
    );
};
