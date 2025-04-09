
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
    </div>
  );
};

export default Layout;
