import React, { useState } from 'react';
import { CaseRow, CaseStatus, SendDocumentScenario } from '../../types';
import { StatusChip } from './StatusChip';
import {
  DOCUMENT_FILENAME,
  DOCUMENT_CREATED_AT,
  SCENARIO_META,
  SCENARIO_RECIPIENTS,
  SCENARIO_COMPLETION_TEXT,
  RecipientGroup,
  requiresPrintBeforeFinish,
} from '../../data/sendDocumentCaseData';

interface Props {
  caseData: CaseRow;
  onBack: () => void;
  onStatusChange: (id: string, status: CaseStatus) => void;
}

/* ---------- Shared header + subheader (identical across all states) ---------- */

function CaseHeader({ caseData, onBack }: { caseData: CaseRow; onBack: () => void }) {
  return (
    <header className="app-header">
      <button className="app-header__back" aria-label="Zurück zur Fallübersicht" onClick={onBack}>
        <span className="icon">arrow_back</span>
      </button>
      <div className="app-header__title">
        <span className="app-header__id">{caseData.id}</span>
        <span className="app-header__dot">·</span>
        <span className="app-header__id">{caseData.title}</span>
        <span className="app-header__dot">·</span>
        <span className="app-header__id">{caseData.customerName}</span>
        <span className="app-header__dot">·</span>
        <span className="app-header__id">{caseData.customerNumber}</span>
        <StatusChip status={caseData.status} />
      </div>
      <div className="app-header__actions">
        <button className="app-header__action-btn" aria-label="Kommentar">
          <span className="icon">comment</span>
        </button>
        <button className="app-header__action-btn" aria-label="Anhang">
          <span className="icon">attach_file</span>
        </button>
      </div>
    </header>
  );
}

function CaseSubheader({ caseData }: { caseData: CaseRow }) {
  const editsDisabled = caseData.status === 'abgeschlossen' || caseData.status === 'geschlossen';
  const initial = (caseData.assignee ?? 'A').charAt(0).toUpperCase();
  return (
    <div className="customer-subheader">
      <div className="customer-subheader__chips">
        <div className="info-chip">
          <span className="icon info-chip__icon">calendar_today</span>
          <span className="info-chip__text">{caseData.createdAt === 'Gerade eben' ? 'Heute' : caseData.createdAt}</span>
        </div>
        <div className="info-chip">
          <span className="icon info-chip__icon">edit_calendar</span>
          <span className="info-chip__text">Vor Kurzem von Anna Müller</span>
        </div>
        <div className="info-chip">
          <span className="icon info-chip__icon">calendar_clock</span>
          <span className="info-chip__text">{caseData.dueAt}</span>
          <span className={`info-chip__edit${editsDisabled ? ' info-chip__edit--disabled' : ''}`}>Bearbeiten</span>
        </div>
        <div className="info-chip">
          <span className="sidebar-avatar info-chip__avatar">{initial}</span>
          <span className="info-chip__text">{caseData.assignee ?? 'Nicht zugewiesen'}</span>
          <span className={`info-chip__edit${editsDisabled ? ' info-chip__edit--disabled' : ''}`}>Bearbeiten</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shared building blocks ---------- */

function AttachmentRow({
  spinning,
  showDownload,
  meta,
  onDownload,
}: {
  spinning: boolean;
  showDownload: boolean;
  meta: string;
  onDownload: () => void;
}) {
  return (
    <div className="case-attachment">
      <div className={`case-attachment__icon${spinning ? ' case-attachment__icon--spinning' : ''}`}>
        <span className="icon icon--lg">{spinning ? 'progress_activity' : 'draft'}</span>
      </div>
      <div className="case-attachment__content">
        <div className="case-attachment__title-row">
          <span className="case-attachment__filename">{DOCUMENT_FILENAME}</span>
          {showDownload && (
            <button className="case-attachment__download" aria-label="Herunterladen" onClick={onDownload}>
              <span className="icon">download</span>
            </button>
          )}
        </div>
        <span className="case-attachment__meta">{meta}</span>
      </div>
    </div>
  );
}

function DetailList({ group }: { group: RecipientGroup }) {
  return (
    <div className="case-detail-list">
      <div className="case-list-header">
        <h3 className="text-h3 case-list-header__title">{group.heading}</h3>
      </div>
      <div className="event-detail-list">
        {group.rows.map(row => (
          <div key={row.label} className="event-detail-list__row">
            <div className="event-detail-list__label">{row.label}</div>
            <div className="event-detail-list__value">
              {Array.isArray(row.value)
                ? row.value.map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))
                : row.value.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Banner({ icon, variant, title, description }: { icon: string; variant: 'pending' | 'success'; title: string; description: string }) {
  return (
    <div className="case-banner">
      <span className={`icon icon-xl case-banner__icon case-banner__icon--${variant}`}>{icon}</span>
      <div className="case-banner__text">
        <p className="text-h2 case-banner__title">{title}</p>
        <p className="text-body case-banner__desc">{description}</p>
      </div>
    </div>
  );
}

/* ---------- State-specific views ---------- */

function WaitingView() {
  return (
    <div className="case-main case-main--centered">
      <div className="case-main__inner">
        <Banner
          icon="schedule"
          variant="pending"
          title="Das Dokument wird gerade erstellt…"
          description="Sobald es fertig ist, kann es versendet werden. Sie können in der Zwischenzeit andere Fälle bearbeiten."
        />
        <AttachmentRow spinning showDownload={false} meta="In Erstellung…" onDownload={() => {}} />
      </div>
    </div>
  );
}

function SendDocumentForm({
  scenario,
  printed,
  showPrintError,
  onPrint,
  onDownload,
}: {
  scenario: SendDocumentScenario;
  printed: boolean;
  showPrintError: boolean;
  onPrint: () => void;
  onDownload: () => void;
}) {
  const meta = SCENARIO_META[scenario];
  const groups = SCENARIO_RECIPIENTS[scenario];
  const showError = showPrintError && requiresPrintBeforeFinish(scenario) && !printed;

  return (
    <div className="case-main">
      <div className="case-main__inner">
        <div className="case-title">
          <p className="text-h2 case-title__text">Dokument senden</p>
          <p className="text-body case-title__desc">{meta.description}</p>
        </div>

        <div className="case-section">
          <div className="case-list-header">
            <h3 className="text-h3 case-list-header__title">Dokument</h3>
            <button className="case-text-btn" onClick={onPrint}>
              <span className="icon">print</span>
              Drucken
            </button>
          </div>
          <AttachmentRow spinning={false} showDownload meta={DOCUMENT_CREATED_AT} onDownload={onDownload} />
          {showError && (
            <p className="case-attachment-error">
              Bitte drucken Sie das Dokument aus oder laden Sie es herunter, bevor Sie fortfahren.
            </p>
          )}
        </div>

        {groups.map(group => (
          <DetailList key={group.heading} group={group} />
        ))}
      </div>
    </div>
  );
}

function CompletionView({ scenario }: { scenario: SendDocumentScenario }) {
  return (
    <div className="case-main case-main--centered">
      <div className="case-main__inner">
        <Banner
          icon="check_circle"
          variant="success"
          title="Fall erfolgreich abgeschlossen"
          description={SCENARIO_COMPLETION_TEXT[scenario]}
        />
      </div>
    </div>
  );
}

/* ---------- Dev-only scenario switcher (not part of the design) ---------- */

function ScenarioSwitcher({
  status,
  scenario,
  onStatusChange,
  onScenarioChange,
}: {
  status: CaseStatus;
  scenario: SendDocumentScenario;
  onStatusChange: (status: CaseStatus) => void;
  onScenarioChange: (scenario: SendDocumentScenario) => void;
}) {
  return (
    <div className="case-dev-switcher" role="group" aria-label="Prototyp-Werkzeug: Szenario wechseln">
      <span className="case-dev-switcher__title">Prototyp-Vorschau</span>
      <label className="case-dev-switcher__field">
        Status
        <select value={status} onChange={e => onStatusChange(e.target.value as CaseStatus)}>
          <option value="warten-auf">Warten auf</option>
          <option value="in-bearbeitung">In Bearbeitung</option>
          <option value="abgeschlossen">Abgeschlossen</option>
        </select>
      </label>
      <label className="case-dev-switcher__field">
        Szenario
        <select value={scenario} onChange={e => onScenarioChange(e.target.value as SendDocumentScenario)}>
          <option value="email">Via Email</option>
          <option value="post">Via Post</option>
          <option value="multi">Mehrere Empfänger</option>
        </select>
      </label>
    </div>
  );
}

/* ---------- Main component ---------- */

export function SendDocumentCase({ caseData, onBack, onStatusChange }: Props) {
  const [scenario, setScenario] = useState<SendDocumentScenario>('email');
  const [printed, setPrinted] = useState(false);
  const [showPrintError, setShowPrintError] = useState(false);

  const handleScenarioChange = (next: SendDocumentScenario) => {
    setScenario(next);
    setPrinted(false);
    setShowPrintError(false);
  };

  const handleStatusChange = (next: CaseStatus) => {
    setPrinted(false);
    setShowPrintError(false);
    onStatusChange(caseData.id, next);
  };

  const handlePrint = () => {
    setPrinted(true);
    window.print();
  };

  const handleDownload = () => {
    setPrinted(true);
  };

  const handleFinish = () => {
    if (requiresPrintBeforeFinish(scenario) && !printed) {
      setShowPrintError(true);
      return;
    }
    onStatusChange(caseData.id, 'abgeschlossen');
  };

  return (
    <div className="app-main case-detail">
      <CaseHeader caseData={caseData} onBack={onBack} />
      <CaseSubheader caseData={caseData} />

      {caseData.status === 'warten-auf' && <WaitingView />}

      {caseData.status === 'in-bearbeitung' && (
        <SendDocumentForm
          scenario={scenario}
          printed={printed}
          showPrintError={showPrintError}
          onPrint={handlePrint}
          onDownload={handleDownload}
        />
      )}

      {(caseData.status === 'abgeschlossen' || caseData.status === 'geschlossen') && (
        <CompletionView scenario={scenario} />
      )}

      {caseData.status === 'warten-auf' && (
        <footer className="case-footer case-footer--end">
          <button className="case-footer__btn case-footer__btn--secondary" onClick={onBack}>
            Zurück zum Fallübersicht
          </button>
        </footer>
      )}

      {caseData.status === 'in-bearbeitung' && (
        <footer className="case-footer">
          <button className="case-footer__btn case-footer__btn--secondary" onClick={onBack}>
            Abbrechen
          </button>
          <div className="case-footer__actions">
            <button className="case-footer__btn case-footer__btn--secondary" onClick={onBack}>
              Zurück
            </button>
            <div className="case-split-btn">
              <button className="case-split-btn__primary" onClick={handleFinish}>
                Fertigstellen
              </button>
              <button className="case-split-btn__dropdown" aria-label="Weitere Optionen">
                <span className="icon">arrow_drop_down</span>
              </button>
            </div>
          </div>
        </footer>
      )}

      {(caseData.status === 'abgeschlossen' || caseData.status === 'geschlossen') && (
        <footer className="case-footer case-footer--end">
          <button className="case-footer__btn case-footer__btn--secondary" onClick={onBack}>
            Zurück zum Fallübersicht
          </button>
        </footer>
      )}

      <ScenarioSwitcher
        status={caseData.status}
        scenario={scenario}
        onStatusChange={handleStatusChange}
        onScenarioChange={handleScenarioChange}
      />
    </div>
  );
}
