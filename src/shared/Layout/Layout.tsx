import { Footer, Header } from '@shared';
import './Layout.scss';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
    <Footer />
  </>
);
