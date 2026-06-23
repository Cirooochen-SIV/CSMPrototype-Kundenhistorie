import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CustomerEvent, LabelChip } from '../types';

const KATEGORIE_OPTIONS = ['Anruf', 'Notiz', 'Übereinstimmung'];
const LIEFERSTELLE_OPTIONS = [
  '19055 Schwerin, Alter Garten 107',
  '19055 Schwerin, Alter Garten 47',
];
const LABEL_SUGGESTIONS = ['Einzeltarif', 'Günstiger Tarif', 'VIP'];
const LABEL_COLORS: Record<string, LabelChip['color']> = {
  'Einzeltarif': 'label-orange',
  'Günstiger Tarif': 'label-green',
  'VIP': 'label-blue',
};

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  required?: boolean;
  error?: boolean;
  errorId?: string;
}

function CustomSelect({ id, label, value, onChange, options, required, error, errorId }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const inTrigger = wrapRef.current?.contains(target);
      const inDropdown = dropdownRef.current?.contains(target);
      if (!inTrigger && !inDropdown) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setOpen(o => !o);
  };

  const hasValue = value !== '';
  const labelUp = hasValue || open;

  const labelClass = [
    'dialog-field__float-label',
    labelUp ? 'dialog-field__float-label--up' : '',
    open && !error ? 'dialog-field__float-label--focus' : '',
    error ? 'dialog-field__float-label--error' : '',
  ].filter(Boolean).join(' ');

  const selectClass = [
    'dialog-field__custom-select',
    open ? 'dialog-field__custom-select--open' : '',
    error ? 'dialog-field__custom-select--error' : '',
  ].filter(Boolean).join(' ');

  const dropdown = (
    <ul
      ref={dropdownRef}
      id={`${id}-listbox`}
      className="dialog-field__custom-dropdown"
      style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width, zIndex: 1100 }}
      role="listbox"
      aria-label={label}
    >
      <li
        className="dialog-field__custom-dropdown-item"
        role="option"
        aria-selected={!hasValue}
        onClick={() => { onChange(''); setOpen(false); }}
      >
        <span className="dialog-field__custom-dropdown-text">Keine Auswahl</span>
        {!hasValue && <span className="icon dialog-field__custom-dropdown-check">check</span>}
      </li>
      {options.map(opt => (
        <li
          key={opt}
          className="dialog-field__custom-dropdown-item"
          role="option"
          aria-selected={value === opt}
          onClick={() => { onChange(opt); setOpen(false); }}
        >
          <span className="dialog-field__custom-dropdown-text">{opt}</span>
          {value === opt && <span className="icon dialog-field__custom-dropdown-check">check</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="dialog-field__float-wrap" ref={wrapRef}>
      <div
        ref={triggerRef}
        id={id}
        className={selectClass}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-describedby={error && errorId ? errorId : undefined}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'ArrowDown' && !open) handleToggle();
        }}
      >
        <span className="dialog-field__custom-select-value">
          {value}
        </span>
        <span className={`icon dialog-field__custom-select-arrow${open ? ' dialog-field__custom-select-arrow--open' : ''}`}>
          arrow_drop_down
        </span>
      </div>
      <label className={labelClass} htmlFor={id}>
        {label}{required && <span className="dialog-field__required"> *</span>}
      </label>
      {open && ReactDOM.createPortal(dropdown, document.body)}
    </div>
  );
}

interface Props {
  onClose: () => void;
  onSubmit: (event: CustomerEvent) => void;
}

export function NewEntryDialog({ onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [kategorie, setKategorie] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [lieferstelle, setLieferstelle] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [showLabelSuggestions, setShowLabelSuggestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (labelInputRef.current && !labelInputRef.current.closest('.dialog-field--labels')?.contains(e.target as Node)) {
        setShowLabelSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const availableSuggestions = LABEL_SUGGESTIONS.filter(l => !labels.includes(l));

  const addLabel = (label: string) => {
    if (!labels.includes(label)) setLabels(prev => [...prev, label]);
    setLabelInput('');
    setShowLabelSuggestions(false);
    labelInputRef.current?.focus();
  };

  const removeLabel = (label: string) => setLabels(prev => prev.filter(l => l !== label));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!title.trim() || !beschreibung.trim() || !kategorie) return;

    const iconMap: Record<string, string> = {
      'Anruf': 'call',
      'Notiz': 'event_note',
      'Übereinstimmung': 'event_note',
    };

    const newEvent: CustomerEvent = {
      id: String(Date.now()),
      date: 'Heute',
      source: 'Anna Miller',
      type: kategorie,
      icon: iconMap[kategorie] ?? 'event_note',
      title: title.trim(),
      description: beschreibung.trim(),
      labels: labels.length > 0 ? labels.map(l => ({ text: l, color: LABEL_COLORS[l] ?? 'label-grey' as LabelChip['color'] })) : undefined,
      isSystem: false,
      details: lieferstelle ? [{ label: 'Lieferstelle', value: lieferstelle }] : undefined,
    };

    onSubmit(newEvent);
    onClose();
  };

  const titleError = submitted && !title.trim();
  const beschreibungError = submitted && !beschreibung.trim();
  const kategorieError = submitted && !kategorie;

  return (
    <div className="dialog-overlay" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={dialogRef}
      >
        <h2 id="dialog-title" className="dialog__title">Neue Kundenhistorie hinzufügen</h2>

        <form onSubmit={handleSubmit} noValidate className="dialog__form">
          <div className="dialog-fields">

            {/* Title */}
            <div className="dialog-field">
              <div className="dialog-field__float-wrap">
                <input
                  id="dialog-title-input"
                  type="text"
                  className={`dialog-field__input${titleError ? ' dialog-field__input--error' : ''}`}
                  placeholder=" "
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  aria-describedby={titleError ? 'dialog-title-error' : undefined}
                />
                <label className="dialog-field__float-label" htmlFor="dialog-title-input">
                  Titel <span className="dialog-field__required">*</span>
                </label>
              </div>
              {titleError && <p id="dialog-title-error" className="dialog-field__error">Bitte geben Sie einen Titel ein.</p>}
            </div>

            {/* Beschreibung */}
            <div className="dialog-field">
              <div className="dialog-field__float-wrap">
                <textarea
                  id="dialog-beschreibung"
                  className={`dialog-field__textarea${beschreibungError ? ' dialog-field__textarea--error' : ''}`}
                  placeholder=" "
                  value={beschreibung}
                  onChange={e => setBeschreibung(e.target.value.slice(0, 100))}
                  rows={3}
                  aria-describedby={beschreibungError ? 'dialog-beschreibung-error' : undefined}
                />
                <label className="dialog-field__float-label dialog-field__float-label--ta" htmlFor="dialog-beschreibung">
                  Beschreibung <span className="dialog-field__required">*</span>
                </label>
              </div>
              <div className="dialog-field__supporting">
                {beschreibungError
                  ? <p id="dialog-beschreibung-error" className="dialog-field__error dialog-field__error--inline">Bitte fügen Sie eine Beschreibung hinzu.</p>
                  : <span className="dialog-field__helper">Beschreiben Sie das Gespräch, die Vereinbarung oder die Notiz.</span>
                }
                <span className="dialog-field__counter">{beschreibung.length} / 100</span>
              </div>
            </div>

            {/* Kategorie */}
            <div className="dialog-field">
              <CustomSelect
                id="dialog-kategorie"
                label="Kategorie"
                value={kategorie}
                onChange={setKategorie}
                options={KATEGORIE_OPTIONS}
                required
                error={kategorieError}
                errorId="dialog-kategorie-error"
              />
              {kategorieError && <p id="dialog-kategorie-error" className="dialog-field__error">Bitte wählen Sie eine Kategorie aus.</p>}
            </div>

            {/* Labels */}
            <div className="dialog-field dialog-field--labels">
              <div
                className={`dialog-field__label-input-wrap${labels.length > 0 || showLabelSuggestions ? ' dialog-field__label-input-wrap--active' : ''}`}
                onClick={() => { setShowLabelSuggestions(true); labelInputRef.current?.focus(); }}
              >
                <span className={`dialog-field__floating-label${labels.length > 0 || showLabelSuggestions ? ' dialog-field__floating-label--up' : ''}`}>
                  Labels
                </span>
                <div className="dialog-field__tags">
                  {labels.map(label => (
                    <span key={label} className={`dialog-tag dialog-tag--${LABEL_COLORS[label] ?? 'label-grey'}`}>
                      {label}
                      <button
                        type="button"
                        className="dialog-tag__remove"
                        onClick={e => { e.stopPropagation(); removeLabel(label); }}
                        aria-label={`${label} entfernen`}
                      >
                        <span className="icon">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    ref={labelInputRef}
                    type="text"
                    className="dialog-field__tag-input"
                    value={labelInput}
                    onChange={e => setLabelInput(e.target.value)}
                    onFocus={() => setShowLabelSuggestions(true)}
                    aria-label="Label hinzufügen"
                  />
                </div>
              </div>
              <div className="dialog-field__supporting">
                <span className="dialog-field__helper">
                  <span className="icon dialog-field__info-icon">info</span>
                  Mehr erfahren.
                </span>
                <span className="dialog-field__counter">{labels.length} / 10</span>
              </div>
              {showLabelSuggestions && availableSuggestions.length > 0 && (
                <div className="dialog-label-suggestions">
                  {availableSuggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      className="dialog-label-suggestion"
                      onMouseDown={e => { e.preventDefault(); addLabel(suggestion); }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lieferstelle */}
            <div className="dialog-field">
              <CustomSelect
                id="dialog-lieferstelle"
                label="Lieferstelle"
                value={lieferstelle}
                onChange={setLieferstelle}
                options={LIEFERSTELLE_OPTIONS}
              />
            </div>

          </div>

          <div className="dialog__actions">
            <button type="button" className="dialog__btn dialog__btn--secondary" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="dialog__btn dialog__btn--primary">
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
