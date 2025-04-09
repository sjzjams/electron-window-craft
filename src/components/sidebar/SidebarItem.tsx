
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItemProps } from './types';

const SidebarItem = ({
  item,
  activeItem,
  hoveredItem,
  expandedItems,
  collapsed,
  toggleExpand,
  setActiveItem,
  setHoveredItem
}: SidebarItemProps) => {
  const handleItemClick = () => {
    setActiveItem(item.name);
    if (item.submenu) {
      toggleExpand(item.name);
    }
  };
  
  return (
    <div key={item.name}>
      <div 
        className={cn(
          "electron-sidebar-item group",
          activeItem === item.name ? "electron-sidebar-item-active" : "",
          collapsed ? "justify-center" : ""
        )}
        onClick={handleItemClick}
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
  );
};

export default SidebarItem;
