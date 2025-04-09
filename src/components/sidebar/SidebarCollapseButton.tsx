
import { cn } from '@/lib/utils';

interface CollapseButtonProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarCollapseButton = ({ collapsed, setCollapsed }: CollapseButtonProps) => {
  if (collapsed) {
    return (
      <div 
        className="absolute right-0 top-1/2 -mr-2.5 bg-electron-item border border-electron-border rounded-full h-5 w-5 flex items-center justify-center cursor-pointer transform -translate-y-1/2 hover:bg-electron-hover"
        onClick={() => setCollapsed(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    );
  }
  
  return (
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
  );
};

export default SidebarCollapseButton;
