
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ContentArea from './ContentArea';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <ContentArea>{children}</ContentArea>
        </main>
      </div>
    </div>
  );
};

export default Layout;
