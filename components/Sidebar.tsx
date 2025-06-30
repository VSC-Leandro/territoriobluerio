

import React from 'react';
import { REPORT_ICONS } from '../constants';
import { ReportType } from '../types';

interface SidebarProps {
  activeItem: ReportType | null;
  setActiveItem: (item: ReportType | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const navItems = [
    ReportType.FLOODS,
    ReportType.VULNERABLE_HOUSES,
    ReportType.DONATIONS,
    ReportType.VOLUNTEERS,
    ReportType.OCCURRENCES,
  ];
  
  const handleItemClick = (itemType: ReportType) => {
    // If the clicked item is already active, deactivate it (set to null).
    // Otherwise, activate the clicked item.
    setActiveItem(activeItem === itemType ? null : itemType);
  };

  return (
    <aside className="w-[380px] bg-brand-dark border-r-2 border-brand-green flex flex-col shrink-0 p-6 space-y-6">
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-5xl font-bold tracking-tighter text-brand-light">TERRITÓRIO</h1>
        <h2 className="text-xl font-semibold text-brand-green uppercase tracking-widest">Painel de Controle</h2>
      </div>
      
      <nav className="flex-grow flex flex-col space-y-2 mt-4">
        {navItems.map((itemType) => {
          const { Icon, name } = REPORT_ICONS[itemType];
          const isActive = activeItem === itemType;
          
          return (
            <button
              key={itemType}
              onClick={() => handleItemClick(itemType)}
              className={`flex items-center justify-between w-full px-4 py-3.5 rounded-lg transition-colors duration-200 relative text-left ${
                isActive 
                  ? 'bg-brand-green/[.10]' 
                  : 'hover:bg-brand-light/5'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-brand-green rounded-r-md"></div>}

              <span className={`font-medium text-sm uppercase tracking-wider pl-2 ${
                isActive ? 'text-brand-green' : 'text-brand-light'
              }`}>
                {name}
              </span>
              <Icon className={`w-6 h-6 ${
                isActive ? 'text-brand-green' : 'text-brand-light/70'
              }`} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
