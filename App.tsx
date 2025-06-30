
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import OccurrencesList from './components/OccurrencesPanel';
import OccurrencesDashboard from './components/OccurrencesDashboard';
import MyOccurrences from './components/MyOccurrences';
import { ActiveView, MenuKey, SubMenuKey, MapPointType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>({ menu: MenuKey.MAP, submenu: null });

  const renderContent = () => {
    switch (activeView.menu) {
      case MenuKey.MAP:
        return <MainContent activeSubMenu={activeView.submenu as MapPointType | null} />;
      
      case MenuKey.OCCURRENCES:
        switch (activeView.submenu) {
          case SubMenuKey.LIST_OCCURRENCES:
            return <OccurrencesList title="Lista de Ocorrências" />;
          case SubMenuKey.MY_OCCURRENCES:
            return <MyOccurrences />;
          default: // null submenu, show dashboard
            return <OccurrencesDashboard />;
        }
      
      default:
        // Fallback to the map view
        return <MainContent activeSubMenu={null} />;
    }
  };

  return (
    <div className="bg-brand-dark text-brand-light font-sans h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
