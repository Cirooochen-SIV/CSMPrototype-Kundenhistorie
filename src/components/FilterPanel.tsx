import React, { useEffect, useRef } from 'react';

export interface FilterState {
  eventTypes: Set<string>;
  entryTypes: Set<string>;
  lieferstellen: Set<string>;
}

const EVENT_TYPE_OPTIONS = [
  'Rechnungserstellung',
  'Zahlstände',
  'Mahnlauf',
  'Anruf',
  'Notiz',
  'Übereinstimmung',
];

const ENTRY_TYPE_OPTIONS = ['System entries', 'Manual entries'];

export const LIEFERSTELLE_OPTIONS = [
  'Werderstrasse 132, 10827 Berlin',
  '19055 Schwerin, Alter Garten 107',
  '19055 Schwerin, Alter Garten 47',
];

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose: () => void;
}

export function FilterPanel({ filters, onChange, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid the opening click from immediately closing
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClick); };
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const activeCount = filters.eventTypes.size + filters.entryTypes.size + filters.lieferstellen.size;

  const toggleEventType = (type: string) => {
    const next = new Set(filters.eventTypes);
    next.has(type) ? next.delete(type) : next.add(type);
    onChange({ ...filters, eventTypes: next });
  };

  const toggleEntryType = (type: string) => {
    const next = new Set(filters.entryTypes);
    next.has(type) ? next.delete(type) : next.add(type);
    onChange({ ...filters, entryTypes: next });
  };

  const toggleLieferstelle = (value: string) => {
    const next = new Set(filters.lieferstellen);
    next.has(value) ? next.delete(value) : next.add(value);
    onChange({ ...filters, lieferstellen: next });
  };

  const clearAll = () => onChange({ eventTypes: new Set(), entryTypes: new Set(), lieferstellen: new Set() });

  return (
    <div className="filter-panel" ref={panelRef} role="dialog" aria-label="Filter">
      <div className="filter-panel__header">
        <span className="filter-panel__title">
          Filters{activeCount > 0 && <span className="filter-panel__count"> ({activeCount})</span>}
        </span>
        {activeCount > 0 && (
          <button className="filter-panel__clear" onClick={clearAll}>Alle löschen</button>
        )}
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-label">Event type</p>
        {EVENT_TYPE_OPTIONS.map(type => (
          <label key={type} className="filter-panel__option">
            <input
              type="checkbox"
              className="filter-panel__checkbox"
              checked={filters.eventTypes.has(type)}
              onChange={() => toggleEventType(type)}
            />
            <span className="filter-panel__option-text">{type}</span>
          </label>
        ))}
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-label">Entry type</p>
        {ENTRY_TYPE_OPTIONS.map(type => (
          <label key={type} className="filter-panel__option">
            <input
              type="checkbox"
              className="filter-panel__checkbox"
              checked={filters.entryTypes.has(type)}
              onChange={() => toggleEntryType(type)}
            />
            <span className="filter-panel__option-text">{type}</span>
          </label>
        ))}
      </div>

      <div className="filter-panel__section">
        <p className="filter-panel__section-label">Lieferstelle</p>
        {LIEFERSTELLE_OPTIONS.map(value => (
          <label key={value} className="filter-panel__option">
            <input
              type="checkbox"
              className="filter-panel__checkbox"
              checked={filters.lieferstellen.has(value)}
              onChange={() => toggleLieferstelle(value)}
            />
            <span className="filter-panel__option-text">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
