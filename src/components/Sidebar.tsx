
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

import SidebarLogo from './sidebar/SidebarLogo';
import SidebarCollapseButton from './sidebar/SidebarCollapseButton';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarThemeToggle from './sidebar/SidebarThemeToggle';
import TaskSection from './sidebar/TaskSection';
import ApplicationLauncher from './sidebar/ApplicationLauncher';
import { navigationItems } from './sidebar/navigationData';

const Sidebar = () => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Income']);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleExpand = (itemName: string) => {
    if (expandedItems.includes(itemName)) {
      setExpandedItems(expandedItems.filter(item => item !== itemName));
    } else {
      setExpandedItems([...expandedItems, itemName]);
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
        <SidebarLogo collapsed={collapsed} />
        {!collapsed && <SidebarCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />}
      </div>

      {/* Navigation */}
      <SidebarNavigation 
        navigationItems={navigationItems}
        activeItem={activeItem}
        hoveredItem={hoveredItem}
        expandedItems={expandedItems}
        collapsed={collapsed}
        toggleExpand={toggleExpand}
        setActiveItem={setActiveItem}
        setHoveredItem={setHoveredItem}
      />

      {/* Application Launcher */}
      <div className="border-t border-electron-border">
        <ApplicationLauncher collapsed={collapsed} />
      </div>
      
      {/* Task Management */}
      <div className="border-t border-electron-border">
        <TaskSection collapsed={collapsed} />
      </div>

      {/* Sidebar footer - Theme toggle */}
      <div className="p-4 mt-auto border-t border-electron-border">
        <SidebarThemeToggle collapsed={collapsed} />
      </div>

      {/* Expand button for collapsed state */}
      {collapsed && <SidebarCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />}
    </div>
  );
};

export default Sidebar;
