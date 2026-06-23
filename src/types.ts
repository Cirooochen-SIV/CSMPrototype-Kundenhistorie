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
  date: string; // "Heute", "Gestern", "12. März 2025", etc.
  source: string; // "kVASy" for system, user name for manual
  type: string; // "Rechnungserstellung", "Anruf", etc.
  icon: string; // Material Symbols icon name
  title: string;
  description: string;
  labels?: LabelChip[];
  details?: DetailRow[];
  isSystem: boolean;
}
