import React from 'react';
import { Sidebar } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { CustomerSubheader } from './components/CustomerSubheader';
import { EventHistory } from './components/EventHistory';
import { AktionenPanel } from './components/AktionenPanel';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <AppHeader />
        <CustomerSubheader />
        <EventHistory />
      </div>
      <AktionenPanel />
    </div>
  );
}

export default App;
