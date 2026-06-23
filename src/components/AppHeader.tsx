import React from 'react';

export function AppHeader() {
  return (
    <header className="app-header">
      <button className="app-header__back" aria-label="Zurück">
        <span className="icon">arrow_back</span>
      </button>
      <div className="app-header__title">
        <span className="app-header__name">Wilson Jenny</span>
        <span className="app-header__dot">·</span>
        <span className="app-header__id">3865349091</span>
        <span className="chip chip--cyan">Sondervertragskunde</span>
        <span className="chip chip--moss">Lastschrift</span>
        <span className="chip chip--grey">+2</span>
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
