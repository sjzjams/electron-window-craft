
import { useState } from 'react';
import { AppWindow, FolderOpen, Settings, Terminal, Globe, FileText, Video, Music, Image, Plus } from 'lucide-react';
import { Application } from './types';
import { cn } from '@/lib/utils';

interface ApplicationLauncherProps {
  collapsed: boolean;
}

const ApplicationLauncher = ({ collapsed }: ApplicationLauncherProps) => {
  const [apps, setApps] = useState<Application[]>(() => {
    const savedApps = localStorage.getItem('electron-apps');
    return savedApps ? JSON.parse(savedApps) : defaultApps;
  });

  const launchApplication = (command: string) => {
    // In a real electron app, we would use electron's shell.openExternal
    // For this web demo, we'll just log and possibly open URLs
    console.log(`Launching application: ${command}`);
    
    // If the command is a URL, we can open it
    if (command.startsWith('http')) {
      window.open(command, '_blank');
    } else {
      // Display a notification that this would open an app in a real desktop app
      alert(`In a real Electron app, this would launch: ${command}`);
    }
  };

  const addApplication = () => {
    // In a real app, this would show a dialog to configure the app
    const name = prompt('Enter application name:');
    if (!name) return;
    
    const command = prompt('Enter application command or URL:');
    if (!command) return;
    
    const newApp: Application = {
      id: Date.now().toString(),
      name,
      icon: AppWindow,
      command
    };
    
    const updatedApps = [...apps, newApp];
    setApps(updatedApps);
    localStorage.setItem('electron-apps', JSON.stringify(updatedApps));
  };

  return (
    <div className="px-3 py-2">
      <div className={cn("flex items-center mb-2", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <h3 className="text-xs font-medium text-electron-text-muted">APPLICATIONS</h3>}
        <button 
          className={cn(
            "text-xs flex items-center justify-center p-1 rounded-md hover:bg-electron-item",
            collapsed ? "w-full" : ""
          )}
          onClick={addApplication}
          title="Add Application"
        >
          <Plus size={16} />
          {!collapsed && <span className="ml-1">Add</span>}
        </button>
      </div>
      
      <div className={cn(
        "grid gap-2", 
        collapsed ? "grid-cols-1" : "grid-cols-2"
      )}>
        {apps.map((app) => (
          <button
            key={app.id}
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors hover:bg-electron-item",
              collapsed ? "w-10 h-10" : "w-full"
            )}
            onClick={() => launchApplication(app.command)}
            title={app.name}
          >
            <app.icon size={collapsed ? 20 : 24} />
            {!collapsed && <span className="text-xs mt-1 truncate w-full text-center">{app.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// Default applications
const defaultApps: Application[] = [
  { id: '1', name: 'Browser', icon: Globe, command: 'https://www.google.com' },
  { id: '2', name: 'Terminal', icon: Terminal, command: 'terminal' },
  { id: '3', name: 'Settings', icon: Settings, command: 'settings' },
  { id: '4', name: 'Files', icon: FolderOpen, command: 'files' },
  { id: '5', name: 'Documents', icon: FileText, command: 'documents' },
  { id: '6', name: 'Images', icon: Image, command: 'images' },
  { id: '7', name: 'Videos', icon: Video, command: 'videos' },
  { id: '8', name: 'Music', icon: Music, command: 'music' },
];

export default ApplicationLauncher;
