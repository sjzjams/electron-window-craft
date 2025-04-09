
import { ReactNode } from 'react';

export interface SubMenuItem {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  submenu?: SubMenuItem[];
}

export interface CategoryItems {
  category: string;
  items: MenuItem[];
}

export interface SidebarItemProps {
  item: MenuItem;
  activeItem: string;
  hoveredItem: string | null;
  expandedItems: string[];
  collapsed: boolean;
  toggleExpand: (itemName: string) => void;
  setActiveItem: (itemName: string) => void;
  setHoveredItem: (itemName: string | null) => void;
}
