import React from 'react';
import { CaseRow } from '../../types';
import { StatusChip } from './StatusChip';

const COLUMNS: { key: string; label: string; sortable?: boolean }[] = [
  { key: 'id', label: 'Fall ID', sortable: true },
  { key: 'title', label: 'Bezeichnung' },
  { key: 'customerName', label: 'Kundenname' },
  { key: 'customerNumber', label: 'Kundennummer' },
  { key: 'status', label: 'Status' },
  { key: 'assignee', label: 'Zugewiesen an', sortable: true },
  { key: 'createdAt', label: 'Erstellt am', sortable: true },
  { key: 'dueAt', label: 'Fällig am', sortable: true },
];

interface Props {
  cases: CaseRow[];
  onOpenCase: (id: string) => void;
}

export function CaseOverview({ cases, onOpenCase }: Props) {
  return (
    <div className="app-main case-overview">
      <div className="section-title case-overview__title-row">
        <h1 className="text-h1 case-overview__title">Fallübersicht</h1>
      </div>

      <div className="filter-bar">
        <div className="filter-bar__count">
          <strong>{cases.length}</strong>&nbsp;Total number of items
        </div>
        <div className="filter-bar__controls">
          <button className="filter-btn">
            <span className="icon">filter_list</span>
            Filter
          </button>
          <button className="filter-btn filter-btn--icon-only" aria-label="Suchen">
            <span className="icon">search</span>
          </button>
        </div>
      </div>

      <div className="case-table-wrap">
        <table className="case-table">
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th key={col.key} className="case-table__th">
                  {col.label}
                  {col.sortable && <span className="icon icon--sm case-table__sort-icon">swap_vert</span>}
                </th>
              ))}
              <th className="case-table__th case-table__th--icon" aria-label="Kommentare" />
              <th className="case-table__th case-table__th--icon" aria-label="Anhänge" />
              <th className="case-table__th case-table__th--icon" aria-label="Weitere Aktionen" />
            </tr>
          </thead>
          <tbody>
            {cases.map(c => {
              const clickable = c.kind === 'send-document';
              return (
                <tr key={c.id} className="case-table__row">
                  <td className="case-table__td">
                    {clickable ? (
                      <button className="case-table__link" onClick={() => onOpenCase(c.id)}>
                        {c.id}
                      </button>
                    ) : (
                      <span className="case-table__link case-table__link--inert">{c.id}</span>
                    )}
                  </td>
                  <td className="case-table__td case-table__td--truncate">{c.title}</td>
                  <td className="case-table__td">{c.customerName}</td>
                  <td className="case-table__td">
                    <span className="case-table__link case-table__link--inert">{c.customerNumber}</span>
                  </td>
                  <td className="case-table__td">
                    <StatusChip status={c.status} />
                  </td>
                  <td className="case-table__td">
                    {c.assignee ?? <span className="case-table__muted">Nicht zugewiesen</span>}
                  </td>
                  <td className="case-table__td">{c.createdAt}</td>
                  <td className="case-table__td">
                    <span className="case-table__due">
                      {c.overdue && <span className="icon icon--sm case-table__overdue-icon">error</span>}
                      {c.dueAt}
                    </span>
                  </td>
                  <td className="case-table__td case-table__td--icon">
                    <span className="icon case-table__row-icon">chat_bubble</span>
                  </td>
                  <td className="case-table__td case-table__td--icon">
                    <span className="icon case-table__row-icon">attach_file</span>
                  </td>
                  <td className="case-table__td case-table__td--icon">
                    <span className="icon case-table__row-icon">more_horiz</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="case-table-footer">
        <div className="case-table-footer__per-page">
          <span>Fälle pro Seite</span>
          <span className="case-table-footer__per-page-value">50</span>
          <span className="icon icon--sm">arrow_drop_down</span>
        </div>
        <div className="case-table-footer__pagination">
          <button className="case-table-footer__nav-btn" aria-label="Vorherige Seite" disabled>
            <span className="icon icon--sm">chevron_left</span>
          </button>
          <span>1 von 1 Seiten</span>
          <button className="case-table-footer__nav-btn" aria-label="Nächste Seite" disabled>
            <span className="icon icon--sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
