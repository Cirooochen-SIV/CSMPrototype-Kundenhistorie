import { SendDocumentScenario } from '../types';

/* Static content for the "Dokument senden" case flow, transcribed from the
   Figma "Send document flow _Offer" designs (nodes under file AgK37LlvN4veHZR2se9L6n). */

export const DOCUMENT_FILENAME = 'Angebotsschreiben_Wilson_Jenny_2101300036.pdf';
export const DOCUMENT_CREATED_AT = 'Erstellt am 04.11.2026, 12:01';

export const EMAIL_MESSAGE = `Sehr geehrte Frau Schneider,
vielen Dank für Ihr Interesse. Im Anhang finden Sie Ihr Angebot als PDF-Dokument. Bitte prüfen Sie die Angaben in Ruhe. Bei Fragen oder Änderungswünschen erreichen Sie uns telefonisch unter 030 123456-0 oder per E-Mail an service@example.de.
Mit freundlichen Grüßen
Ihr Kundenservice
Musterstadtwerke GmbH`;

export interface RecipientRow {
  label: string;
  value: string | string[];
}

export interface RecipientGroup {
  heading: string;
  rows: RecipientRow[];
}

export const SCENARIO_META: Record<SendDocumentScenario, { label: string; description: string }> = {
  email: {
    label: 'Via Email',
    description: 'Das Dokument wird per E-Mail an alle Empfänger gesendet.',
  },
  post: {
    label: 'Via Post',
    description: 'Drucken Sie das Dokument für jeden Empfänger aus und versenden Sie es per Post.',
  },
  multi: {
    label: 'Mehrere Empfänger',
    description: 'E-Mails werden automatisch gesendet. Für Empfänger per Post drucken Sie das Dokument aus und versenden es selbst.',
  },
};

export const SCENARIO_RECIPIENTS: Record<SendDocumentScenario, RecipientGroup[]> = {
  email: [
    {
      heading: 'Empfänger',
      rows: [
        { label: 'Vertragspartner', value: 'Herr Wilson Jenny' },
        { label: 'Versandart', value: 'E-mail' },
        { label: 'An', value: ['wilson.jenny@email.de', 'w.jenny12321@example.de'] },
        { label: 'Betreff', value: 'Ihr Angebot – Kundennummer 2101300036' },
        { label: 'Nachricht', value: EMAIL_MESSAGE },
      ],
    },
  ],
  post: [
    {
      heading: 'Empfänger',
      rows: [
        { label: 'Vertragspartner', value: 'Herr Wilson Jenny' },
        { label: 'Versand', value: 'Brief' },
        { label: 'Anschrift', value: ['Herr', 'Wilson Jenny', 'OT Mitte', 'Gartenstraße 24', '10115 Berlin', 'Deutschland'] },
      ],
    },
  ],
  multi: [
    {
      heading: 'Empfänger I',
      rows: [
        { label: 'Ansprechpartner', value: 'Herr Thomas Weber' },
        { label: 'Rolle beim Vertragspartner', value: 'Kopieempfänger' },
        { label: 'Versand', value: 'Brief' },
        { label: 'Anschrift', value: ['Herr', 'Thomas Weber', 'OT Mitte', 'Gartenstraße 24', '10115 Berlin', 'Deutschland'] },
      ],
    },
    {
      heading: 'Empfänger II',
      rows: [
        { label: 'Ansprechpartner', value: 'Herr Julia Schneider' },
        { label: 'Rolle beim Vertragspartner', value: 'Kopieempfänger' },
        { label: 'Versand', value: 'E-Mail' },
        { label: 'An', value: 'Julia.schneider@example.com' },
        { label: 'Betreff', value: 'Ihr Angebot – Kundennummer 2101300036' },
        { label: 'Nachricht', value: EMAIL_MESSAGE },
      ],
    },
  ],
};

export const SCENARIO_COMPLETION_TEXT: Record<SendDocumentScenario, string> = {
  email: 'Das Dokument wurde per E-Mail gesendet.',
  post: 'Das Dokument wurde ausgedruckt und zum Versand per Post vorbereitet.',
  multi: 'Das Dokument wurde per E-Mail versendet und für den Postversand ausgedruckt.',
};

/** Print/download is required before "Fertigstellen" only for the postal scenario. */
export function requiresPrintBeforeFinish(scenario: SendDocumentScenario): boolean {
  return scenario === 'post';
}
