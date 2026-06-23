# Design system

This file defines the design tokens and implementation rules for this product.
**Read this before writing any UI code. Always use these tokens — never hardcode raw values.**

---

## Tech stack

- **Framework:** React + TypeScript
- **Styling:** CSS custom properties — token names map 1:1 to CSS variables, e.g. `var(--surface-container-primary)`
- **Icons:** Material Symbols Rounded (outlined) + Material Icons Round (filled) — loaded via Google Fonts
- **Token source:** `figma-variables.json` (Figma Variables API export, file: `nordic-design-system`)

---

## Theme

This design system has **two modes: Light and Dark**. Apply the active theme class to the `<html>` element:

```html
<html class="theme-light"> <!-- or theme-dark -->
```

Implement tokens as CSS custom properties with per-class overrides:

```css
.theme-light  { --surface: #ffffff; --on-surface-primary: #1a1a1a; /* etc. */ }
.theme-dark   { --surface: #131516; --on-surface-primary: #f7f7f7; /* etc. */ }
```

**Exceptions — tokens that are identical in both modes** (do not need per-theme overrides):
- All `label-*` chip colors
- All `avatar-*` colors
- `on-surface-avatar` (`#1a1a1a`)
- `on-surface-disabled` and `on-surface-high-disabled` (`#717580`)
- All `radius-*` and `spacing-*` tokens

---

## Typography

Font family: **Open Sans** for all text. **Material Symbols Rounded** (outlined) and **Material Icons Round** (filled) for icons. Typography tokens have no light/dark variants.

| Token | Size | Line height | Weight | Letter spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| `display` | 32px | 40px | 700 | -0.64px | Chart percentages on Dashboard |
| `h1` | 24px | 32px | 700 | -0.24px | Page titles, global search headers, widget numeric values |
| `h2` | 18px | 24px | 700 | 0 | Form titles |
| `h3` | 14px | 22px | 600 | 0 | Form section titles |
| `actions` | 14px | 22px | 600 | 0 | Button labels, links |
| `body` | 14px | 22px | 400 | 0 | Primary body text, input values, table content |
| `body-bold` | 14px | 22px | 600 | 0 | Emphasised body text |
| `labels` | 12px | 20px | 600 | 0 | Search result labels, dropdown menus |
| `details` | 12px | 18px | 400 | 0 | Secondary text (user roles, avatar initials) |
| `details-bold` | 12px | 18px | 600 | 0 | Emphasised secondary text |
| `caption` | 10px | 15px | 400 | 0 | Captions, footnotes, input error messages |
| `caption-bold` | 10px | 15px | 600 | 0 | Emphasised captions and footnotes |

### Icon sizes

| Token | Size | Font |
| --- | --- | --- |
| `icons-xl` | 64px | Material Icons Round (filled) / Material Symbols Rounded (outlined) |
| `icons-lg` | 24px | Material Symbols Rounded (outlined) / Material Icons Round (filled) |
| `icons-default` | 20px | Material Symbols Rounded (outlined) / Material Icons Round (filled) |
| `icons-sm` | 16px | Material Symbols Rounded |

---

## Color tokens

### On-surface (text and icons)

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `on-surface-primary` | `#1a1a1a` | `#f7f7f7` | Headings and titles |
| `on-surface-secondary` | `#1a1a1a` | `#f7f7f7` | Body text, input values, supporting text |
| `on-surface-tertiary` | `#6c6c6c` | `#949799` | Label text |
| `on-surface-disabled` | `#717580` | `#717580` | Disabled text *(same in both modes)* |
| `on-surface-placeholder` | `#a4a7ae` | `#6c6c6c` | Placeholder text, empty state icons |
| `on-surface-status` | `#3c3c3c` | `#131516` | Text on case status chips |
| `on-surface-label` | `#3c3c3c` | `#131516` | Text on label components |
| `on-surface-navigation` | `#3c3c3c` | `#f7f7f7` | Text and icons in side navigation |
| `on-surface-high` | `#3c3c3c` | `#f7f7f7` | Text on `surface-container-high` |
| `on-surface-high-secondary` | `#6c6c6c` | `#f7f7f7` | Secondary text on `surface-container-high` |
| `on-surface-high-disabled` | `#717580` | `#717580` | Disabled text on `surface-container-high` *(same in both modes)* |
| `on-surface-brand` | `#ffffff` | `#f7f7f7` | Text on `surface-container-brand` |
| `on-surface-label-disabled` | `#717580` | `#7e838d` | Disabled label text |
| `on-surface-avatar` | `#1a1a1a` | `#1a1a1a` | Text on avatar backgrounds *(same in both modes)* |
| `inverse-on-surface` | `#ffffff` | `#131516` | Text on inverted surfaces (e.g. Snackbar) |

### Surfaces

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `surface` | `#ffffff` | `#131516` | Main content background (full screen, drawer) |
| `surface-secondary` | `#fafafa` | `#0c0e12` | Side navigation background |
| `surface-tertiary` | `#fafafa` | `#0c0e12` | Side panel background |
| `surface-secondary-hover` | `#ebebeb` | `#222630` | Hover on `surface-secondary` |
| `scrim` | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.50)` | Overlay backdrop (drawers, popovers, alerts) |

### Containers

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `surface-container-primary` | `#ffffff` | `#131516` | Cards, search bars, table rows, inputs |
| `surface-container-primary-hover` | `#fafafa` | `#222630` | Hover on primary container |
| `surface-container-primary-selected` | `#f6f8ff` | `#1b2436` | Selected state |
| `surface-container-primary-selected-hover` | `#eff4ff` | `#1c2639` | Hover on selected state |
| `surface-container-secondary` | `#fafafa` | `#222630` | Table headers and footers |
| `surface-container-secondary-hover` | `#f5f5f5` | `#222630` | Hover on secondary container |
| `surface-container-tertiary` | `#e9eaeb` | `#222630` | Selected bar, third-level components |
| `surface-container-quaternary` | `#e9eaeb` | `#373a41` | Progress bar tracks |
| `surface-container-high` | `#ffffff` | `#222630` | Dropdowns, calendars |
| `surface-container-high-hover` | `#fafafa` | `#2b2f37` | Hover on `surface-container-high` |
| `surface-container-high-secondary` | `#f5f5f5` | `#222630` | Secondary high-surface components |
| `surface-container-high-secondary-hover` | `#f2f2f2` | `#222630` | Hover on secondary high surface |
| `surface-container-high-highlighted` | `#e9eaeb` | `#222630` | Pinned comment background |
| `surface-container-highlighted` | `#fff4ed` | `#1f2024` | Highlighted content |
| `surface-container-disabled` | `#fafafa` | `#1f222a` | Disabled inputs and components |
| `surface-container-brand` | `#494aa7` | `#414141` | Product-related components (global search) |
| `surface-container-ai` | `#f1f2ff` | `#1f2236` | AI-generated content background |
| `surface-container-ai-high` | `#dee5ff` | `#2e324d` | AI-prefilled content highlight |
| `surface-container-success` | `#f0f9f3` | `#192c28` | AI-matching input fields |
| `surface-container-success-high` | `#d9f0e2` | `#162f22` | Highlight for AI-matching text |
| `surface-container-warning` | `#fff8eb` | `#2f281c` | AI non-matching input fields |
| `surface-container-warning-high` | `#feead9` | `#352719` | Highlight for AI non-matching text |
| `surface-container-error` | `#fef2f2` | `#2f2124` | Error state container |
| `surface-container-info` | `#e5eefb` | `#1b2436` | Info state container |
| `inverse-surface-container-primary` | `#404040` | `#fafafa` | Inverted surface (Snackbar) |

### Accent (interactive)

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `accent-primary` | `#1666e5` | `#95b2ff` | Primary buttons, checkboxes, radio buttons, focus states |
| `accent-on-primary` | `#ffffff` | `#131516` | Text/icons on primary buttons |
| `accent-primary-hover` | `#175cd3` | `#7d96fc` | Hover on primary buttons |
| `accent-primary-disabled` | `#fafafa` | `#222630` | Disabled primary button background |
| `accent-on-primary-disabled` | `#a4a7ae` | `#858b8e` | Disabled text on primary buttons |
| `accent-secondary` | `#ffffff` | `#131516` | Secondary action background |
| `accent-on-secondary` | `#3c3c3c` | `#f7f7f7` | Text/icons on secondary actions |
| `accent-secondary-hover` | `#f5f5f5` | `#222630` | Hover on secondary actions |
| `accent-secondary-disabled` | `#ffffff` | `#131516` | Disabled secondary background |
| `accent-on-secondary-disabled` | `#a4a7ae` | `#858b8e` | Disabled text on secondary actions |
| `accent-tertiary` | `#fafafa` | `#222630` | Tertiary action background |
| `accent-on-tertiary` | `#3c3c3c` | `#f7f7f7` | Text/icons on tertiary actions |
| `accent-tertiary-hover` | `#f5f5f5` | `#222630` | Hover on tertiary actions |
| `accent-tertiary-disabled` | `#fafafa` | `#222630` | Disabled tertiary background |
| `accent-on-tertiary-disabled` | `#a4a7ae` | `#858b8e` | Disabled text on tertiary actions |

### Semantic

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `semantics-error` | `#cc1818` | `#f97066` | Error text, icons, negative button text; error input borders |
| `semantics-error-hover` | `#c41717` | `#ef6c62` | Hover on error elements |
| `semantics-warning` | `#ff9819` | `#fdb022` | Warning message icons |
| `semantics-warning-hover` | `#ea8a17` | `#e8a21f` | Hover on warning elements |
| `semantics-success` | `#008748` | `#47cd89` | Success message text and icons |
| `semantics-info` | `#1666e5` | `#528bff` | Info state text and icons |
| `semantics-ai` | `#5358f9` | `#787dff` | AI icon background |
| `semantics-focus` | `#333333` | `#ffffff` | Focus ring color |
| `semantics-skeleton` | `#f4f4f4` | `#1e2129` | Skeleton loading component |

### Outlines (borders)

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `outline-primary` | `#d5d7db` | `#373a41` | Interactive element borders (inputs) |
| `outline-secondary` | `#e9eaeb` | `#292e38` | Default border across components |
| `outline-tertiary` | `#ededed` | `#222630` | Low-contrast borders (table rows) |
| `outline-disabled` | `#ededed` | `#222630` | Disabled interactive element borders |
| `outline-warning` | `#feead9` | `#42351c` | Border for `surface-container-warning` |
| `outline-success` | `#d9f0e2` | `#1d3b31` | Border for `surface-container-success` |
| `outline-error` | `#ffe1e1` | `#41282a` | Border for `surface-container-error` |
| `outline-info` | `#d1dfff` | `#202d49` | Border for `surface-container-info` |
| `outline-ai` | `#dee5ff` | `#272b49` | Border for `surface-container-ai` |
| `outline-highlight` | `#ffe6d5` | `#2a2828` | Border for highlighted containers |

### Case statuses

Status badge text always uses `on-surface-status`. Badge backgrounds:

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `status-progress` | `#c7e0ff` | `#84c5ff` | In progress |
| `status-to-do` | `#ffd388` | `#ffbf54` | To-do |
| `status-positive` | `#bbe5cc` | `#7fe7b5` | Positive / closed |
| `status-negative` | `#ffc8c8` | `#ff9999` | Negative / rejected |
| `status-archived` | `#dde0e4` | `#aeb4ba` | Archived |

### Energy type icons

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `energy-electricity` | `#ffbe17` | `#ffc845` | Electricity icon background |
| `energy-gas` | `#ff5252` | `#ff4c4c` | Gas icon background |
| `energy-water` | `#17abff` | `#3a8dff` | Water icon background |
| `energy-waste-water` | `#af5725` | `#d07442` | Waste water icon background |
| `energy-heat` | `#e95e1d` | `#ff7435` | Heat icon background |
| `energy-other` | `#6c1bf0` | `#8b4dff` | Other energy icon background |

### Product brand colors

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `product-inbound` | `#494aa7` | `#414141` | Inbound Management icon |
| `product-csm` | `#4380d9` | `#2d50a0` | CSM icon |
| `product-feed-in` | `#227a7b` | `#206065` | Feed-in icon |
| `product-management` | `#ff7959` | `#c44832` | Product Management icon |

### Label chip colors

Label chips are **mode-independent** — the same pastel values apply in both light and dark mode. Text on all label chips uses `on-surface-label`.

| Token | Default | Hover | Disabled |
| --- | --- | --- | --- |
| `label-grey` | `#f3f4f6` | `#e2e3e4` (L) / `#eeeeee` (D) | `#f3f4f6` (L) / `#c0baba` (D) |
| `label-moss` | `#e6f4d7` | `#cddabf` (L) / `#d3e1c5` (D) | `#e6f4df` (L) / `#bbc8ae` (D) |
| `label-green` | `#d3f8df` | `#bde4cc` (L) / `#c5e9d0` (D) | `#e4fff0` (L) / `#96b9a1` (D) |
| `label-cyan` | `#cff9fe` | `#b1d9de` (L) / `#bce4e9` (D) | `#e7fbff` (L) / `#98b7bb` (D) |
| `label-blue` | `#d1e9ff` | `#b9d1eb` (L) / `#bed7ed` (D) | `#eaf6ff` (L) / `#9bafc2` (D) |
| `label-indigo` | `#e0eaff` | `#c5d4df` (L) / `#cad3e5` (D) | `#eaeff8` (L) / `#abb3c4` (D) |
| `label-purple` | `#ebe9fe` | `#cccbe0` (L) / `#d3d1e4` (D) | `#e5e3ef` (L) / `#aeacbe` (D) |
| `label-pink` | `#fce7f6` | `#e5cede` (L) / `#eed7e8` (D) | `#f2e5ef` (L) / `#cfb8c9` (D) |
| `label-orange` | `#ffe6d5` | `#ecd4c3` (L) / `#f2daca` (D) | `#f8e8dc` (L) / `#c7b3a6` (D) |
| `label-yellow` | `#fef7c3` | `#ede6af` (L) / `#f6efb9` (D) | `#fef9da` (L) / `#d0c993` (D) |

### Avatar colors *(mode-independent)*

Text on all avatars uses `on-surface-avatar` (`#1a1a1a`).

| Token | Value |
| --- | --- |
| `avatar-yellow` | `#ffe099` |
| `avatar-orange` | `#ffc799` |
| `avatar-pink` | `#ff99ca` |
| `avatar-violet` | `#ca99ff` |
| `avatar-blue` | `#99cbff` |
| `avatar-teal` | `#99dcff` |
| `avatar-green` | `#b2e6c3` |
| `avatar-grey` | `#ebebeb` |

---

## Spacing *(mode-independent)*

Base unit: 4px. Use these tokens for all padding, gap, and margin values.

| Token | Value |
| --- | --- |
| `spacing-none` | `0px` |
| `spacing-xs` | `4px` |
| `spacing-sm` | `8px` |
| `spacing-md` | `12px` |
| `spacing-lg` | `16px` |
| `spacing-2lg` | `32px` |

---

## Border radius *(mode-independent)*

Note: `redius-lg` and `redius-round` are spelled this way in the token file — use these exact names when referencing the source.

| Token | Value | Usage |
| --- | --- | --- |
| `radius-none` | `0px` | No rounding |
| `radius-sm` | `4px` | Tags, small chips |
| `radius-md` | `8px` | Default — cards, inputs, buttons |
| `radius-lg` | `16px` | Larger cards, modals |
| `radius-round` | `32px` | Pills, avatars, badges |

---

## Shadows / elevation

### Light mode

| Token | CSS value | Usage |
| --- | --- | --- |
| `elevation-1` | `0 1px 3px ````#0a0d1214````, 0 1px 2px -1px ````#0a0d120f` | Cards, dashboard widgets |
| `elevation-2` | `0 12px 16px -4px ````#0a0d1214````, 0 4px 6px -2px ````#0a0d1208````, 0 2px 2px -1px ````#0a0d120a` | Dropdowns, popovers, tooltips, datepicker |
| `elevation-3` | `0 3px 3px -1.5px ````#0a0d120a````, 0 8px 8px -4px ````#0a0d1208````, 0 20px 24px -4px ````#0a0d1214` | Modals, dialogs, overlays |

### Dark mode

| Token | CSS value |
| --- | --- |
| `elevation-1-dark` | `0 0 0 1px ````#ffffff0d````, 0 1px 3px #00000066, 0 1px 2px -1px ````#0000008c` |
| `elevation-2-dark` | `0 0 0 1px ````#ffffff0f````, 0 8px 12px -4px #00000099, 0 2px 2px -1px ````#0000008c` |
| `elevation-3-dark` | `0 0 0 1px ````#ffffff12````, 0 16px 24px -6px ````#000000b3````, 0 4px 4px -2px #00000099` |

**Elevation rules:**
- `elevation-1` — cards, dashboard widgets (slightly above background)
- `elevation-2` — dropdowns, popovers, tooltips, datepickers (floats above content, doesn't block it)
- `elevation-3` — modals, dialogs, overlays (blocking overlays requiring user attention)

---

## Do and don't

### Do
- Use semantic tokens (`surface-container-primary`, `on-surface-secondary`) — never raw hex values
- Always apply both light and dark mode values when implementing a token as a CSS custom property
- Use `on-surface-status` for all text on status badge chips
- Apply `accent-primary` for all primary interactive states (buttons, checkboxes, focus rings)
- Apply the correct elevation shadow based on the component type
- Use `spacing-*` tokens for all padding and gap values
- Use `radius-md` (8px) as the default border radius

### Don't
- Don't hardcode any hex color values in component code
- Don't assume a token is the same in both modes — always check the table above
- Don't use `label-*` color tokens as general background colors — they are only for the Label chip component
- Don't apply `avatar-*` colors outside of avatar components
- Don't use the `strings` collection from the token file — those are UI copy variables, not design tokens
- Don't reference the `Label` collection's `labelFill`/`labelText` variable aliases directly — use the resolved `label-*` and `on-surface-label` tokens instead
---

## Quality
- All interactive elements must be keyboard accessible
- Use semantic HTML (header, main, nav, section, footer)
- Include alt text on all images
- Meet WCAG 2.2 AA contrast requirements
