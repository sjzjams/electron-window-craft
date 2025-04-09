
import { cn } from '@/lib/utils';
import SidebarItem from './SidebarItem';
import { CategoryItems } from './types';

interface SidebarNavigationProps {
  navigationItems: CategoryItems[];
  activeItem: string;
  hoveredItem: string | null;
  expandedItems: string[];
  collapsed: boolean;
  toggleExpand: (itemName: string) => void;
  setActiveItem: (itemName: string) => void;
  setHoveredItem: (itemName: string | null) => void;
}

const SidebarNavigation = ({
  navigationItems,
  activeItem,
  hoveredItem,
  expandedItems,
  collapsed,
  toggleExpand,
  setActiveItem,
  setHoveredItem
}: SidebarNavigationProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {navigationItems.map((categoryGroup) => (
        <div key={categoryGroup.category} className="mt-1">
          <div className="electron-sidebar-category">
            {!collapsed && categoryGroup.category}
          </div>
          <nav>
            {categoryGroup.items.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                activeItem={activeItem}
                hoveredItem={hoveredItem}
                expandedItems={expandedItems}
                collapsed={collapsed}
                toggleExpand={toggleExpand}
                setActiveItem={setActiveItem}
                setHoveredItem={setHoveredItem}
              />
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
};

export default SidebarNavigation;
