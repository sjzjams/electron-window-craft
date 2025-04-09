
import { useState } from 'react';
import { ChevronDown, ChevronRight, Settings, Bell, Home, Users, FileText, CalendarClock, LineChart } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  submenu?: SubMenuItem[];
}

interface CategoryItems {
  category: string;
  items: MenuItem[];
}

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Income']);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems: CategoryItems[] = [
    {
      category: 'MAIN',
      items: [
        { name: 'Dashboard', icon: Home, path: '/' },
        { name: 'Audience', icon: Users, path: '/audience', 
          submenu: [
            { name: 'Analytics', path: '/audience/analytics' },
            { name: 'Segments', path: '/audience/segments' }
          ]
        },
        { name: 'Posts', icon: FileText, path: '/posts' },
        { name: 'Schedules', icon: CalendarClock, path: '/schedules' },
        { name: 'Income', icon: LineChart, path: '/income',
          submenu: [
            { name: 'Earnings', path: '/income/earnings' },
            { name: 'Refunds', path: '/income/refunds' },
            { name: 'Declines', path: '/income/declines' },
            { name: 'Payouts', path: '/income/payouts' }
          ]
        }
      ]
    },
    {
      category: 'SETTINGS',
      items: [
        { name: 'Notification', icon: Bell, path: '/notifications' },
        { name: 'Settings', icon: Settings, path: '/settings',
          submenu: [
            { name: 'Profile', path: '/settings/profile' },
            { name: 'Security', path: '/settings/security' },
            { name: 'Preferences', path: '/settings/preferences' }
          ]
        }
      ]
    }
  ];

  const toggleExpand = (itemName: string) => {
    if (expandedItems.includes(itemName)) {
      setExpandedItems(expandedItems.filter(item => item !== itemName));
    } else {
      setExpandedItems([...expandedItems, itemName]);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item.name);
    if (item.submenu) {
      toggleExpand(item.name);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-screen bg-electron-sidebar border-r border-electron-border flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-electron-border">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-gray-500/50 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
            <span className="ml-2 font-semibold text-white">Logoipsum</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-6 w-6 rounded-full bg-gray-500/50 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        )}
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)} 
            className="text-electron-text-muted hover:text-electron-text-primary"
          >
            <span className="sr-only">Collapse sidebar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((categoryGroup) => (
          <div key={categoryGroup.category} className="mt-1">
            <div className="electron-sidebar-category">
              {!collapsed && categoryGroup.category}
            </div>
            <nav>
              {categoryGroup.items.map((item) => (
                <div key={item.name}>
                  <div 
                    className={cn(
                      "electron-sidebar-item group",
                      activeItem === item.name ? "electron-sidebar-item-active" : "",
                      collapsed ? "justify-center" : ""
                    )}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => collapsed && setHoveredItem(item.name)}
                    onMouseLeave={() => collapsed && setHoveredItem(null)}
                  >
                    <item.icon size={20} className="min-w-[20px]" />
                    {!collapsed && (
                      <>
                        <span className="ml-2 flex-1">{item.name}</span>
                        {item.submenu && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(item.name);
                            }}
                            className="text-electron-text-muted hover:text-electron-text-primary"
                          >
                            {expandedItems.includes(item.name) ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Hover menu for collapsed state */}
                  {collapsed && hoveredItem === item.name && item.submenu && (
                    <div 
                      className="absolute left-[72px] z-10 bg-electron-item rounded-md shadow-lg py-2 min-w-[180px] animate-fade-in"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="text-sm font-semibold px-4 py-2 border-b border-electron-border">
                        {item.name}
                      </div>
                      {item.submenu.map((subitem) => (
                        <div 
                          key={subitem.name}
                          className="electron-sidebar-item"
                          onClick={() => setActiveItem(subitem.name)}
                        >
                          <span className="ml-2">{subitem.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expanded submenu */}
                  {!collapsed && expandedItems.includes(item.name) && item.submenu && (
                    <div className="electron-sidebar-submenu">
                      {item.submenu.map((subitem) => (
                        <div 
                          key={subitem.name}
                          className={cn(
                            "electron-sidebar-item",
                            activeItem === subitem.name ? "electron-sidebar-item-active" : ""
                          )}
                          onClick={() => setActiveItem(subitem.name)}
                        >
                          <span>{subitem.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar footer - Theme toggle */}
      <div className="p-4 border-t border-electron-border">
        {!collapsed ? (
          <div className="flex justify-between items-center">
            <button 
              className={cn(
                "px-3 py-1 rounded-md flex items-center justify-center transition",
                theme === 'light' ? 'bg-electron-item' : 'bg-transparent'
              )}
              onClick={toggleTheme}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              Light
            </button>
            <button 
              className={cn(
                "px-3 py-1 rounded-md flex items-center justify-center transition",
                theme === 'dark' ? 'bg-electron-item' : 'bg-transparent'
              )}
              onClick={toggleTheme}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              Dark
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button 
              onClick={toggleTheme} 
              className="text-electron-text-muted hover:text-electron-text-primary"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Expand button for collapsed state */}
      {collapsed && (
        <div 
          className="absolute right-0 top-1/2 -mr-2.5 bg-electron-item border border-electron-border rounded-full h-5 w-5 flex items-center justify-center cursor-pointer transform -translate-y-1/2 hover:bg-electron-hover"
          onClick={() => setCollapsed(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
