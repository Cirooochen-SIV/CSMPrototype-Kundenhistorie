import React from 'react';

const INFO_CHIPS = [
  { icon: 'location_on', text: '19055 Schwerin, Alter Garten 107' },
  { icon: 'mail',        text: 'marc.heidelberg@gmail.com' },
  { icon: 'call',        text: '(+49) 163 555 1584' },
  { icon: 'cake',        text: '21.02.1986' },
];

export function CustomerSubheader() {
  return (
    <div className="customer-subheader">
      <div className="customer-subheader__chips">
        {INFO_CHIPS.map(({ icon, text }) => (
          <div key={icon} className="info-chip">
            <span className="icon info-chip__icon">{icon}</span>
            <span className="info-chip__text">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
