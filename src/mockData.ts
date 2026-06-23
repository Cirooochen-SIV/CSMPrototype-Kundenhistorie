import { CustomerEvent } from './types';

export const mockEvents: CustomerEvent[] = [
  {
    id: '1',
    date: 'Heute',
    source: 'kVASy',
    type: 'Rechnungserstellung',
    icon: 'database',
    title: 'Tarifwechsel auf „ÖkoStrom Aktiv" zum 01.05.2026 abgeschlossen.',
    description:
      'Der Tarif wurde erfolgreich von „KlassikerStrom Basis" auf „ÖkoStrom Aktiv" umgestellt. Der neue Tarif gilt ab dem 01.05.2026 und beinhaltet 100 % Ökostrom aus erneuerbaren Energiequellen.',
    isSystem: true,
    details: [
      { label: 'Alter Tarif', value: 'KlassikerStrom Basis' },
      { label: 'Neuer Tarif', value: 'ÖkoStrom Aktiv' },
      { label: 'Gültig ab', value: '01.05.2026' },
      { label: 'Neuer Grundpreis', value: '12,90 € / Monat' },
      { label: 'Neuer Arbeitspreis', value: '31,2 Ct / kWh' },
      { label: 'Vertragslaufzeit', value: '12 Monate' },
      { label: 'Verarbeitet am', value: '28.04.2026 · 01:44 Uhr' },
    ],
  },
  {
    id: '2',
    date: 'Gestern',
    source: 'kVASy',
    type: 'Zahlstände',
    icon: 'database',
    title: 'Turnauszahlung Strom offen — Zahlbetrag 14.382 kWh.',
    description:
      'Zählerstandsmeldung für die Messperiode April 2026 liegt vor. Der ermittelte Verbrauch beträgt 14.382 kWh. Die Auszahlung des Turnsaldos ist aktuell ausstehend.',
    isSystem: true,
    details: [
      { label: 'Zählernummer', value: '1ESY1160030787' },
      { label: 'Sparte', value: 'Strom' },
      { label: 'Ablesedatum', value: '30.04.2026' },
      { label: 'Vorheriger Stand', value: '48.210 kWh' },
      { label: 'Aktueller Stand', value: '62.592 kWh' },
      { label: 'Verbrauch', value: '14.382 kWh' },
      { label: 'Status', value: 'Offen' },
    ],
  },
  {
    id: '3',
    date: 'Gestern',
    source: 'kVASy',
    type: 'Rechnungserstellung',
    icon: 'database',
    title: 'Jahresrechnung Gas 2025 erstellt — Guthaben 38,20 €.',
    description:
      'Die Jahresrechnung für den Gasverbrauch 2025 wurde automatisch erstellt. Das errechnete Guthaben von 38,20 € wird innerhalb von 14 Werktagen auf das hinterlegte Konto überwiesen.',
    isSystem: true,
    details: [
      { label: 'Lieferstelle', value: 'Werderstrasse 132, 10827 Berlin' },
      { label: 'Abrechnungszeitraum', value: '01.01.2025 – 31.12.2025' },
      { label: 'Verbrauch', value: '3.420 kWh' },
      { label: 'Endbetrag', value: '1.284,55 € inkl. USt.' },
      { label: 'Bereits geleistete Abschläge', value: '1.322,75 €' },
      { label: 'Guthaben', value: '38,20 €' },
      { label: 'Erstellt am', value: '28.04.2026 · 03:10 Uhr' },
    ],
  },
  {
    id: '4',
    date: 'Gestern',
    source: 'kVASy',
    type: 'Mahnlauf',
    icon: 'database',
    title: 'Mahnlauf Stufe 1 abgeschlossen — offener Betrag 142,80 €.',
    description:
      'Die erste Mahnstufe wurde automatisch ausgelöst, da Rechnung Nr. RE-2026-04182 bis zum Fälligkeitsdatum unbezahlt blieb. Eine Mahnung wurde postalisch versandt.',
    isSystem: true,
    details: [
      { label: 'Rechnungsnummer', value: 'RE-2026-04182' },
      { label: 'Fälligkeitsdatum', value: '14.04.2026' },
      { label: 'Offener Betrag', value: '142,80 €' },
      { label: 'Mahnstufe', value: '1 von 3' },
      { label: 'Mahngebühr', value: '5,00 €' },
      { label: 'Versanddatum', value: '28.04.2026' },
      { label: 'Neue Zahlungsfrist', value: '07.05.2026' },
    ],
  },
  {
    id: '5',
    date: 'Heute',
    source: 'Anna Miller',
    type: 'Anruf',
    icon: 'call',
    title: 'Kundin meldet sich zur erhöhten Abschlagszahlung ab Mai.',
    description:
      'Kundin ruft an und erkundigt sich über die Erhöhung des monatlichen Abschlags ab Mai 2026. Sie wurde über die gestiegenen Energiekosten und die aktuelle Tarifanpassung informiert. Kundin ist einverstanden.',
    isSystem: false,
    details: [
      { label: 'Lieferstelle', value: 'Werderstrasse 132, 10827 Berlin' },
    ],
  },
  {
    id: '6',
    date: 'Gestern',
    source: 'Anna Miller',
    type: 'Notiz',
    icon: 'event_note',
    title: 'Kundin wünscht künftig Rechnungsversand per E-Mail.',
    description:
      'Kundin möchte zukünftig keine Papierrechnung mehr erhalten. Die E-Mail-Adresse m.hoffmann@email.de wurde als Versandadresse für alle künftigen Rechnungen hinterlegt.',
    labels: [{ text: 'Vereinbarungen', color: 'label-green' }],
    isSystem: false,
    details: [
      { label: 'Lieferstelle', value: 'Werderstrasse 132, 10827 Berlin' },
    ],
  },
  {
    id: '7',
    date: 'Gestern',
    source: 'Anna Miller',
    type: 'Notiz',
    icon: 'event_note',
    title: 'Kundin wünscht künftig Rechnungsversand per E-Mail.',
    description:
      'Rückruf der Kundin zur Bestätigung — Umstellung auf E-Mail-Rechnungsversand wurde korrekt eingetragen. Kundin hat eine Testbenachrichtigung erhalten und den Empfang bestätigt.',
    isSystem: false,
    details: [
      { label: 'Lieferstelle', value: 'Werderstrasse 132, 10827 Berlin' },
    ],
  },
];
