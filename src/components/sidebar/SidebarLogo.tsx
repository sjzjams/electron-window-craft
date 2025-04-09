
import { cn } from '@/lib/utils';

interface SidebarLogoProps {
  collapsed: boolean;
}

const SidebarLogo = ({ collapsed }: SidebarLogoProps) => {
  return (
    <>
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
    </>
  );
};

export default SidebarLogo;
