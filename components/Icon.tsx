// Furkin icons for the website. 24 grid, 2.5 stroke, round caps and joins, no fills.
// Same set as the app (docs/design/icons/svg). Colour follows currentColor.
import type { JSX, SVGProps } from 'react';

export type IconName = 'feed' | 'walk' | 'medication' | 'litter' | 'toilet' | 'weight' | 'treat' | 'grooming' | 'note' | 'today' | 'pets' | 'activity' | 'household' | 'care-guide' | 'plus' | 'check' | 'close' | 'back' | 'chevron-right' | 'chevron-down' | 'edit' | 'share' | 'bell' | 'settings' | 'camera' | 'calendar' | 'clock' | 'search' | 'more' | 'trash' | 'archive' | 'phone' | 'map-pin' | 'document' | 'qr-code' | 'link' | 'filter' | 'warning' | 'info' | 'offline' | 'skip' | 'upload' | 'streak' | 'key' | 'home' | 'sign-out' | 'view-list' | 'view-day' | 'undo';

const glyphs: Record<IconName, JSX.Element> = {
  'feed': <><path d="M3.5 11h17l-1.4 6.1A3 3 0 0 1 16.2 19.5H7.8a3 3 0 0 1-2.9-2.4z"/><path d="M9 6.5h.01"/><path d="M12 5h.01"/><path d="M15 6.5h.01"/></>,
  'walk': <><circle cx="6.5" cy="6.5" r="3.5"/><path d="M9 9c3.5 1 5.6 3.2 6.6 6.4"/><circle cx="17.5" cy="18" r="2.5"/></>,
  'medication': <><path d="M10.3 3.9a5 5 0 0 1 7.1 7.1l-6.4 6.4a5 5 0 0 1-7.1-7.1z"/><path d="M7.1 7.1l7.1 7.1"/></>,
  'litter': <><path d="M3 11h18l-1.3 7.4a2 2 0 0 1-2 1.6H6.3a2 2 0 0 1-2-1.6z"/><path d="M14 11l3.6-6.3"/><path d="M16 4l3.2 1.8"/></>,
  'toilet': <><path d="M12 3.5c3.2 4.2 5.5 7.1 5.5 10.2a5.5 5.5 0 0 1-11 0c0-3.1 2.3-6 5.5-10.2z"/></>,
  'weight': <><rect x="3.5" y="4" width="17" height="16" rx="4"/><path d="M8.5 11a3.5 3.5 0 0 1 7 0"/><path d="M12 11l1.6-2"/></>,
  'treat': <><path d="M8 8.5h8a2.5 2.5 0 1 1 2.5 3.5 2.5 2.5 0 1 1-2.5 3.5H8a2.5 2.5 0 1 1-2.5-3.5A2.5 2.5 0 1 1 8 8.5z"/></>,
  'grooming': <><rect x="3.5" y="5" width="17" height="5" rx="2"/><path d="M6.5 10v8.5"/><path d="M10.5 10v8.5"/><path d="M14.5 10v8.5"/><path d="M18 10v5"/></>,
  'note': <><rect x="5" y="3.5" width="14" height="17" rx="3"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h3"/></>,
  'today': <><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></>,
  'pets': <><circle cx="6.5" cy="9.5" r="2"/><circle cx="12" cy="5.5" r="2"/><circle cx="17.5" cy="9.5" r="2"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 3-4 3s-4-1-4-3z"/></>,
  'activity': <><path d="M9.5 6h10.5"/><path d="M9.5 12h10.5"/><path d="M9.5 18h10.5"/><path d="M4.5 6h.01"/><path d="M4.5 12h.01"/><path d="M4.5 18h.01"/></>,
  'household': <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 15c2.7 0 4.5 2 4.5 5"/></>,
  'care-guide': <><path d="M5 19.5V5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/><path d="M12 12.5c-2-1.4-3-2.4-3-3.6a1.5 1.5 0 0 1 3-.6 1.5 1.5 0 0 1 3 .6c0 1.2-1 2.2-3 3.6z"/></>,
  'plus': <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  'check': <><path d="M5 12.5l4.5 4.5L19 7.5"/></>,
  'close': <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
  'back': <><path d="M15 5l-7 7 7 7"/></>,
  'chevron-right': <><path d="M9 5l7 7-7 7"/></>,
  'chevron-down': <><path d="M5 9l7 7 7-7"/></>,
  'edit': <><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></>,
  'share': <><path d="M12 15V3.5"/><path d="M7.5 8L12 3.5 16.5 8"/><path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"/></>,
  'bell': <><path d="M6 9a6 6 0 0 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17S6 15.5 6 9z"/><path d="M10 20.5h4"/></>,
  'settings': <><path d="M4 7h9"/><path d="M17 7h3"/><circle cx="15" cy="7" r="2"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="9" cy="17" r="2"/></>,
  'camera': <><path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5L9 4.5h6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5z"/><circle cx="12" cy="13" r="3.5"/></>,
  'calendar': <><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/></>,
  'clock': <><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
  'search': <><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></>,
  'more': <><path d="M5.5 12h.01"/><path d="M12 12h.01"/><path d="M18.5 12h.01"/></>,
  'trash': <><path d="M4 6.5h16"/><path d="M9 6.5V4h6v2.5"/><path d="M6 6.5l1 12.5A1.5 1.5 0 0 0 8.5 20.5h7a1.5 1.5 0 0 0 1.5-1.5l1-12.5"/></>,
  'archive': <><rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/></>,
  'phone': <><path d="M5 4h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 5.3 5.3l1.4-2.2 4.5 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></>,
  'map-pin': <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/></>,
  'document': <><path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"/><path d="M14 3.5V8h4.5"/><path d="M9 13h6"/><path d="M9 16.5h4"/></>,
  'qr-code': <><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><path d="M14 14h2.5v2.5"/><path d="M20 14v.01"/><path d="M14 20h.01"/><path d="M17.5 20H20v-3"/></>,
  'link': <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></>,
  'filter': <><path d="M4 5.5h16"/><path d="M7 12h10"/><path d="M10 18.5h4"/></>,
  'warning': <><path d="M10.3 4.2a2 2 0 0 1 3.4 0l7.5 13a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></>,
  'info': <><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8h.01"/></>,
  'offline': <><path d="M7 18.5h10a4 4 0 0 0 1.2-7.8A6 6 0 0 0 7.4 8.6 5 5 0 0 0 7 18.5z"/><path d="M4 4l16 16"/></>,
  'skip': <><path d="M5 6l8 6-8 6z"/><path d="M18 6v12"/></>,
  'upload': <><path d="M12 16V4.5"/><path d="M7.5 9L12 4.5 16.5 9"/><path d="M4.5 16v2.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V16"/></>,
  'streak': <><path d="M12 3c2.2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 2 1 3 2 3 0-3 0-5 1-8z"/></>,
  'key': <><circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8L20 3"/><path d="M16.5 6.5l2.5 2.5"/></>,
  'home': <><path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M10 20v-5h4v5"/></>,
  'sign-out': <><path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M15 8l4 4-4 4"/><path d="M19 12H9.5"/></>,
  'view-list': <><rect x="3.5" y="4" width="17" height="6" rx="2"/><rect x="3.5" y="14" width="17" height="6" rx="2"/></>,
  'view-day': <><path d="M4 4.5h3"/><path d="M4 12h3"/><path d="M4 19.5h3"/><rect x="10" y="3.5" width="10.5" height="6" rx="2"/><rect x="10" y="13" width="10.5" height="7.5" rx="2"/></>,
  'undo': <><path d="M9 5L4.5 9.5 9 14"/><path d="M4.5 9.5H14a5.5 5.5 0 0 1 0 11h-3"/></>,
};

type Props = { name: IconName; size?: number; label?: string } & Omit<SVGProps<SVGSVGElement>, 'name'>;

export function Icon({ name, size = 24, label, ...rest }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" role={label ? 'img' : undefined} aria-label={label}
      aria-hidden={label ? undefined : true} focusable="false" className="fk-icon" {...rest}>
      {glyphs[name]}
    </svg>
  );
}
