
import React, { useState, useEffect } from 'react';
import { MENU_STRUCTURE } from '../constants';
import { MenuKey, SubMenuKey, ActiveView } from '../types';
import { ChevronDownIcon } from './icons';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(activeView.menu);

  useEffect(() => {
    // Keep accordion open if the active view is within it
    if (activeView.menu) {
      setOpenMenu(activeView.menu);
    }
  }, [activeView.menu]);

  const handleMenuClick = (menuKey: MenuKey) => {
    // Clicking the main menu item shows its default view (Dashboard for Occurrences)
    setActiveView({ menu: menuKey, submenu: null });
    setOpenMenu(prevOpenMenu => (prevOpenMenu === menuKey ? null : menuKey));
  };

  const handleSubMenuClick = (menuKey: MenuKey, subMenuKey: SubMenuKey) => {
    setActiveView({ menu: menuKey, submenu: subMenuKey });
  };

  return (
    <aside className="w-[380px] bg-brand-dark border-r-2 border-brand-green flex flex-col shrink-0 p-6 space-y-6">
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-5xl font-bold tracking-tighter text-brand-light">TERRITÓRIO</h1>
        <h2 className="text-xl font-semibold text-brand-green uppercase tracking-widest">Painel de Controle</h2>
      </div>
      
      <nav className="flex-grow flex flex-col space-y-2 mt-4">
        {(Object.keys(MENU_STRUCTURE) as MenuKey[]).map((menuKey) => {
          const menu = MENU_STRUCTURE[menuKey];
          const isMenuOpen = openMenu === menuKey;
          const isMenuActive = activeView.menu === menuKey && activeView.submenu === null;

          return (
            <div key={menuKey}>
              <button
                onClick={() => handleMenuClick(menuKey)}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-lg transition-colors duration-200 relative text-left ${
                  isMenuActive ? 'bg-brand-green/[.10]' : 'hover:bg-brand-light/5'
                }`}
                aria-expanded={isMenuOpen}
              >
                {isMenuActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-brand-green rounded-r-md"></div>}
                <div className="flex items-center space-x-4">
                  <menu.Icon className={`w-6 h-6 ${isMenuActive ? 'text-brand-green' : 'text-brand-light/70'}`} />
                  <span className={`font-medium text-sm uppercase tracking-wider ${isMenuActive ? 'text-brand-green' : 'text-brand-light'}`}>
                    {menu.label}
                  </span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-brand-light/70 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMenuOpen && (
                <div className="pl-6 pt-2 pb-1 space-y-1">
                  {(Object.keys(menu.submenus) as SubMenuKey[]).map((subMenuKey) => {
                     const submenu = menu.submenus[subMenuKey];
                     if (!submenu) return null;
                     const isSubMenuActive = activeView.submenu === subMenuKey;
                     
                     return (
                        <button
                          key={subMenuKey}
                          onClick={() => handleSubMenuClick(menuKey, subMenuKey)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-200 relative text-left ${
                            isSubMenuActive ? 'bg-brand-green/[.10]' : 'hover:bg-brand-light/5'
                          }`}
                          aria-current={isSubMenuActive ? 'page' : undefined}
                        >
                           {isSubMenuActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-brand-green rounded-r-md"></div>}
                           <div className="flex items-center space-x-4">
                            <submenu.Icon className={`w-6 h-6 ${isSubMenuActive ? 'text-brand-green' : 'text-brand-light/60'}`} />
                            <span className={`font-medium text-xs uppercase tracking-wider ${isSubMenuActive ? 'text-brand-green' : 'text-brand-light'}`}>
                                {submenu.label}
                            </span>
                           </div>
                        </button>
                     );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
