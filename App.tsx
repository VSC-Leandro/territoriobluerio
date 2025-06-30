
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import OccurrencesPanel from './components/OccurrencesPanel';
import { ReportType } from './types';

const App: React.FC = () => {
  const [activeReportType, setActiveReportType] = useState<ReportType | null>(null);

  return (
    <div className="bg-brand-dark text-brand-light font-sans h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem={activeReportType} setActiveItem={setActiveReportType} />
        {activeReportType === ReportType.OCCURRENCES ? (
          <OccurrencesPanel />
        ) : (
          <MainContent activeReportType={activeReportType} />
        )}
      </div>
    </div>
  );
};

export default App;
