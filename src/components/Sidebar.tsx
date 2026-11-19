import React, { useState } from 'react';

export type SidebarNav = 'dashboard' | 'falluebersicht';

const NAV_ITEMS: { icon: string; label: string; nav: SidebarNav }[] = [
  { icon: 'grid_view', label: 'Dashboard', nav: 'dashboard' },
  { icon: 'home_storage', label: 'Fallübersicht', nav: 'falluebersicht' },
];

const BOTTOM_NAV = [
  { icon: 'explore', label: 'Release Notes', hasDot: true },
  { icon: 'description', label: 'Dokumentation' },
];

function SidebarLogo() {
  return (
    <div className="sidebar-logo" aria-label="Stadtwerke Freiberg">
      <svg className="sidebar-logo__svg" width="110" height="30" viewBox="0 0 110 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <text x="0" y="18" fontFamily="Open Sans, sans-serif" fontSize="13" fontWeight="700" fill="#d0271d" letterSpacing="-0.3">stadtwerke</text>
        <text x="0" y="29" fontFamily="Open Sans, sans-serif" fontSize="9.5" fontWeight="600" fill="currentColor" letterSpacing="1.5">FREIBERG</text>
      </svg>
    </div>
  );
}

interface Props {
  activeNav?: SidebarNav;
  onNavigate?: (nav: SidebarNav) => void;
}

export function Sidebar({ activeNav = 'dashboard', onNavigate }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`} aria-label="Navigation">
      <div className="sidebar-inner">

        {/* Header */}
        <div className="sidebar-header">
          {/* Collapsed: centered expand button */}
          <button
            className="sidebar-icon-btn sidebar-btn-expand"
            aria-label="Sidebar öffnen"
            onClick={() => setCollapsed(false)}
          >
            <span className="icon">left_panel_open</span>
          </button>

          {/* Expanded: logo + collapse button */}
          <div className="sidebar-expanded-header">
            <SidebarLogo />
            <button
              className="sidebar-icon-btn sidebar-btn-collapse"
              aria-label="Sidebar schließen"
              onClick={() => setCollapsed(true)}
            >
              <span className="icon">left_panel_close</span>
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {/* App selector */}
          <div className="nav-item nav-app-selector" role="button" tabIndex={0} data-tooltip="CSM">
            <div className="nav-icon-wrap nav-icon-wrap--app">
              <span className="icon">headset_mic</span>
              <span className="nav-dot" aria-hidden="true" />
            </div>
            <span className="nav-label">CSM</span>
            <span className="icon nav-extra">unfold_more</span>
          </div>

          {NAV_ITEMS.map(({ icon, label, nav }) => (
            <button
              key={label}
              className={`nav-item${activeNav === nav ? ' nav-item--active' : ''}`}
              aria-label={label}
              aria-current={activeNav === nav ? 'page' : undefined}
              data-tooltip={label}
              onClick={() => onNavigate?.(nav)}
            >
              <div className="nav-icon-wrap">
                <span className="icon">{icon}</span>
              </div>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        {/* Bottom */}
        <div className="sidebar-bottom">
          {BOTTOM_NAV.map(({ icon, label, hasDot }) => (
            <button key={label} className="nav-item" aria-label={label} data-tooltip={label}>
              <div className="nav-icon-wrap">
                <span className="icon">{icon}</span>
                {hasDot && <span className="nav-dot" aria-hidden="true" />}
              </div>
              <span className="nav-label">{label}</span>
            </button>
          ))}
          <button className="sidebar-profile" data-tooltip="Anna Miller" aria-label="Benutzer: Anna Miller">
            <div className="sidebar-avatar">A</div>
            <span className="nav-label">Anna Miller</span>
            <span className="icon nav-extra">unfold_more</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
