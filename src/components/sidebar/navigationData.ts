
import { Home, Users, FileText, CalendarClock, LineChart, Bell, Settings } from 'lucide-react';
import { CategoryItems } from './types';

export const navigationItems: CategoryItems[] = [
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
