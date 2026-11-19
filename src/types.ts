export interface DetailRow {
  label: string;
  value: string;
}

export interface LabelChip {
  text: string;
  color: 'label-grey' | 'label-green' | 'label-blue' | 'label-yellow' | 'label-orange';
}

export interface CustomerEvent {
  id: string;
  date: string; // "Heute", "Gestern", "Vor 1 Tag", etc.
  time?: string; // "14:23 Uhr"
  source: string; // "kVASy" for system, user name for manual
  type: string; // "Rechnungserstellung", "Anruf", etc.
  icon: string; // Material Symbols icon name
  title: string;
  description: string;
  labels?: LabelChip[];
  details?: DetailRow[];
  isSystem: boolean;
}

/* ===== Case Management (Fallübersicht) ===== */

export type CaseStatus = 'warten-auf' | 'offen' | 'in-bearbeitung' | 'abgeschlossen' | 'geschlossen';

export type SendDocumentScenario = 'email' | 'post' | 'multi';

export interface CaseRow {
  id: string; // "SIV-1099"
  title: string; // "Dokument senden"
  customerName: string;
  customerNumber: string;
  status: CaseStatus;
  assignee: string | null;
  createdAt: string;
  dueAt: string;
  overdue?: boolean;
  /** Only "send-document" cases have a fully implemented detail flow in this prototype. */
  kind: 'send-document' | 'generic';
}
