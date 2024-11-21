import Header from "../Header/Header";
import './Layout.scss'

export const Layout = ({ children } : { children: React.ReactNode }) => (
  <div className="layout">
	<Header />
    <main>{children}</main>
  </div>
);


