import Header from '@shared/Header/Header';
import './Layout.scss';
import { Footer } from '@shared/Footer/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
    <Footer />
  </>
);
