
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 border-b border-electron-border flex items-center justify-between px-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-electron-text-muted" />
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 bg-electron-item text-electron-text-primary rounded-md focus:outline-none focus:ring-1 focus:ring-electron-border w-72"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-md hover:bg-electron-item">
          <Bell size={20} className="text-electron-text-secondary" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-electron-item flex items-center justify-center">
            <User size={16} className="text-electron-text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
