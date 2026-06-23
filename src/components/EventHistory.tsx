import React, { useState, useRef, useEffect } from 'react';
import { mockEvents } from '../mockData';
import { CustomerEvent } from '../types';
import { EventCard } from './EventCard';
import { NewEntryDialog } from './NewEntryDialog';
import { FilterPanel, FilterState, LIEFERSTELLE_OPTIONS } from './FilterPanel';

const TABS = [
  'Kundenhistorie',
  'Fälle',
  'Bankverbindung',
  'Verträge',
  'Rechnungen',
  'Offene Posten',
];

const EMPTY_FILTERS: FilterState = { eventTypes: new Set(), entryTypes: new Set(), lieferstellen: new Set() };

function applyFilters(events: CustomerEvent[], filters: FilterState): CustomerEvent[] {
  return events.filter(event => {
    if (filters.eventTypes.size > 0 && !filters.eventTypes.has(event.type)) return false;
    if (filters.entryTypes.size > 0) {
      const isSystem = filters.entryTypes.has('System entries');
      const isManual = filters.entryTypes.has('Manual entries');
      if (isSystem && isManual) return true;
      if (isSystem && !event.isSystem) return false;
      if (isManual && event.isSystem) return false;
    }
    if (filters.lieferstellen.size > 0) {
      const eventLieferstelle = event.details?.find(d => d.label === 'Lieferstelle')?.value;
      if (!eventLieferstelle || !filters.lieferstellen.has(eventLieferstelle)) return false;
    }
    return true;
  });
}

export function EventHistory() {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState<CustomerEvent[]>(mockEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [lieferstelleOpen, setLieferstelleOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const lieferstelleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lieferstelleOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (lieferstelleRef.current && !lieferstelleRef.current.contains(e.target as Node)) {
        setLieferstelleOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClick), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClick); };
  }, [lieferstelleOpen]);

  const handleNewEntry = (event: CustomerEvent) => {
    setEvents(prev => [event, ...prev]);
  };

  const activeFilterCount = filters.eventTypes.size + filters.entryTypes.size;
  const visibleEvents = applyFilters(events, filters);

  return (
    <div className="event-history">
      {/* Tabs */}
      <nav className="tab-bar" aria-label="Page sections" role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`tab-item${activeTab === i ? ' tab-item--active' : ''}`}
            onClick={() => setActiveTab(i)}
            aria-selected={activeTab === i}
            role="tab"
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="section" role="tabpanel">
        {/* Section title */}
        <div className="section-title">
          <h2 className="section-title__text">Kundenhistorie</h2>
          <button className="section-title__action" onClick={() => setDialogOpen(true)}>
            <span className="icon">add_circle</span>
            Neue Kundenhistorie hinzufügen
          </button>
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-bar__count">
            <strong>{visibleEvents.length}</strong>&nbsp;Events
          </div>
          <div className="filter-bar__controls">
            <button className="filter-btn">
              <span className="icon">calendar_today</span>
              13.04.2026 - 19.04.2026
            </button>
            <div className="filter-btn-wrap" ref={lieferstelleRef}>
              <button
                className={`filter-btn${filters.lieferstellen.size > 0 ? ' filter-btn--active' : ''}`}
                onClick={() => setLieferstelleOpen(v => !v)}
                aria-expanded={lieferstelleOpen}
              >
                Lieferstelle{filters.lieferstellen.size > 0 && ` (${filters.lieferstellen.size})`}
                <span className="icon">arrow_drop_down</span>
              </button>
              {lieferstelleOpen && (
                <div className="filter-panel" role="dialog" aria-label="Lieferstelle filtern">
                  <div className="filter-panel__header">
                    <span className="filter-panel__title">Lieferstelle</span>
                    {filters.lieferstellen.size > 0 && (
                      <button
                        className="filter-panel__clear"
                        onClick={() => setFilters(f => ({ ...f, lieferstellen: new Set() }))}
                      >
                        Alle löschen
                      </button>
                    )}
                  </div>
                  <div className="filter-panel__section">
                    {LIEFERSTELLE_OPTIONS.map(value => (
                      <label key={value} className="filter-panel__option">
                        <input
                          type="checkbox"
                          className="filter-panel__checkbox"
                          checked={filters.lieferstellen.has(value)}
                          onChange={() => {
                            const next = new Set(filters.lieferstellen);
                            next.has(value) ? next.delete(value) : next.add(value);
                            setFilters(f => ({ ...f, lieferstellen: next }));
                          }}
                        />
                        <span className="filter-panel__option-text">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="filter-btn-wrap">
              <button
                className={`filter-btn${activeFilterCount > 0 ? ' filter-btn--active' : ''}`}
                onClick={() => setFilterOpen(v => !v)}
                aria-expanded={filterOpen}
              >
                <span className="icon">filter_list</span>
                Filter{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </button>
              {filterOpen && (
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onClose={() => setFilterOpen(false)}
                />
              )}
            </div>
            <button className="filter-btn filter-btn--icon-only" aria-label="Suchen">
              <span className="icon">search</span>
            </button>
          </div>
        </div>

        {/* Event list */}
        <div className="event-list">
          {visibleEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              isLast={index === visibleEvents.length - 1}
            />
          ))}
          {visibleEvents.length === 0 && (
            <p className="event-list__empty">Keine Events für die gewählten Filter.</p>
          )}
        </div>

        {/* Show more */}
        <div className="show-more">
          <button className="show-more__btn">Show more</button>
        </div>
      </main>

      {/* Dialog */}
      {dialogOpen && (
        <NewEntryDialog
          onClose={() => setDialogOpen(false)}
          onSubmit={handleNewEntry}
        />
      )}
    </div>
  );
}

export default EventHistory;
