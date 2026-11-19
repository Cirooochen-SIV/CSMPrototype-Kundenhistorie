import React from 'react';
import { CaseStatus } from '../../types';

const STATUS_CONFIG: Record<CaseStatus, { label: string; icon: string; modifier: string }> = {
  'warten-auf': { label: 'Warten auf', icon: 'schedule', modifier: 'negative' },
  'offen': { label: 'Offen', icon: 'radio_button_unchecked', modifier: 'to-do' },
  'in-bearbeitung': { label: 'In Bearbeitung', icon: 'radio_button_partial', modifier: 'progress' },
  'abgeschlossen': { label: 'Abgeschlossen', icon: 'check_circle', modifier: 'positive' },
  'geschlossen': { label: 'Geschlossen', icon: 'lock', modifier: 'archived' },
};

interface Props {
  status: CaseStatus;
  className?: string;
}

export function StatusChip({ status, className }: Props) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`status-chip status-chip--${cfg.modifier}${className ? ` ${className}` : ''}`}>
      <span className="icon icon--sm">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
