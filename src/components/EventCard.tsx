import React, { useState } from 'react';
import { CustomerEvent } from '../types';

interface Props {
  event: CustomerEvent;
  isLast: boolean;
}

export function EventCard({ event, isLast }: Props) {
  const hasDetails = !!(event.details && event.details.length > 0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="event-row">
      {/* Leading icon column */}
      <div className="event-leading">
        <div className={`event-icon${event.isSystem ? ' event-icon--system' : ' event-icon--manual'}`}>
          <span className="icon">{event.isSystem ? 'database' : 'event_note'}</span>
        </div>
        {!isLast && <div className="event-connector" />}
      </div>

      {/* Content column */}
      <div className="event-content">
        {/* Meta info */}
        <div className="event-meta">
          <span className="event-meta__text">{event.date}</span>
          <span className="event-meta__dot">·</span>
          <span className="event-meta__text">{event.source}</span>
          <span className="event-meta__dot">·</span>
          <span className="event-meta__text">{event.type}</span>
          {event.labels?.map((label, i) => (
            <span key={i} className={`event-label event-label--${label.color}`}>
              {label.text}
            </span>
          ))}
        </div>

        {/* Card */}
        <div className="event-card">
          {hasDetails && (
            <button
              className="event-card__toggle"
              onClick={() => setExpanded(e => !e)}
              aria-expanded={expanded}
              aria-label={expanded ? 'Zuklappen' : 'Aufklappen'}
            >
              <span className="icon">{expanded ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
            </button>
          )}
          <div className="event-card__body">
            <div className="event-card__title-group">
              <p className="event-card__title">{event.title}</p>
              <p className="event-card__desc">{event.description}</p>
            </div>
            {expanded && event.details && (
              <div className="event-detail-list">
                {event.details.map((row, i) => (
                  <div key={i} className="event-detail-list__row">
                    <div className="event-detail-list__label">{row.label}</div>
                    <div className="event-detail-list__value">{row.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
