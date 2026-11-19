import React, { useState } from 'react';
import { Sidebar, SidebarNav } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { CustomerSubheader } from './components/CustomerSubheader';
import { EventHistory } from './components/EventHistory';
import { AktionenPanel } from './components/AktionenPanel';
import { CaseOverview } from './components/case/CaseOverview';
import { SendDocumentCase } from './components/case/SendDocumentCase';
import { mockCases } from './mockData';
import { CaseRow, CaseStatus } from './types';

type View = 'customer' | 'case-overview' | 'case-detail';

function App() {
  const [view, setView] = useState<View>('case-overview');
  const [cases, setCases] = useState<CaseRow[]>(mockCases);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const activeCase = cases.find(c => c.id === activeCaseId) ?? null;

  const handleNavigate = (nav: SidebarNav) => {
    setView(nav === 'falluebersicht' ? 'case-overview' : 'customer');
  };

  const handleOpenCase = (id: string) => {
    setActiveCaseId(id);
    setView('case-detail');
  };

  const handleBackToOverview = () => {
    setView('case-overview');
  };

  const handleCaseStatusChange = (id: string, status: CaseStatus) => {
    setCases(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeNav={view === 'customer' ? 'dashboard' : 'falluebersicht'}
        onNavigate={handleNavigate}
      />

      {view === 'customer' && (
        <>
          <div className="app-main">
            <AppHeader />
            <CustomerSubheader />
            <EventHistory />
          </div>
          <AktionenPanel />
        </>
      )}

      {view === 'case-overview' && (
        <CaseOverview cases={cases} onOpenCase={handleOpenCase} />
      )}

      {view === 'case-detail' && activeCase && (
        <SendDocumentCase
          caseData={activeCase}
          onBack={handleBackToOverview}
          onStatusChange={handleCaseStatusChange}
        />
      )}
    </div>
  );
}

export default App;
