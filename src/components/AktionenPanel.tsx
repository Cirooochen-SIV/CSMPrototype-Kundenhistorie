import React from 'react';

const ACTIONS = [
  'Kundendaten ändern',
  'Rechnungsadresse ändern',
  'Kontakte ändern',
  'Neue Belieferung',
  'Zählerstand erfassen',
  'Abschlag ändern',
  'Ratenplan anlegen',
  'Mahnsperren bearbeiten',
];

export function AktionenPanel() {
  return (
    <aside className="aktionen-panel" aria-label="Aktionen">
      <div className="aktionen-panel__header">
        <span className="aktionen-panel__title">Aktionen</span>
      </div>
      <div className="aktionen-panel__content">
        <div className="aktionen-search">
          <span className="icon aktionen-search__icon">search</span>
          <input
            type="text"
            className="aktionen-search__input"
            placeholder="Suchen…"
            aria-label="Aktionen durchsuchen"
          />
        </div>
        <nav className="aktionen-links" aria-label="Schnellzugriff">
          {ACTIONS.map((action) => (
            <button key={action} className="aktionen-link">
              {action}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
