// Furkin design tokens. Generated from the Furkin design system (tokens.json).
// Drop-in for packages/tokens/src. Same shape as SPEC.md, plus danger, onDanger and the scrim.
// Never use these hex values directly in components: go through the theme (NativeWind vars).

export type Role = 'background' | 'surface' | 'ink' | 'muted' | 'primary' | 'done' | 'accent' | 'action' | 'onAction' | 'onFill' | 'shadow' | 'danger' | 'onDanger';
export type ProfileId = 'glacier' | 'lavender' | 'tangerine' | 'matcha' | 'nordic';
export type Mode = 'light' | 'dark';

export const profiles: Record<ProfileId, { name: string; description: string; light: Record<Role, string>; dark: Record<Role, string> }> = {
  glacier: { name: 'Glacier', description: 'Default. Crisp, icy blues',
    light: { background: '#F3F7FB', surface: '#FFFFFF', ink: '#121A2E', muted: '#47506A', primary: '#8EC5FF', done: '#9FE7E0', accent: '#C9D7FF', action: '#2E4BCC', onAction: '#FFFFFF', onFill: '#121A2E', shadow: '#121A2E', danger: '#B42318', onDanger: '#FFFFFF' },
    dark:  { background: '#0E1424', surface: '#18213A', ink: '#E8EEFA', muted: '#A9B4CC', primary: '#7AB8FF', done: '#7FD9D0', accent: '#AFC2FF', action: '#8EC5FF', onAction: '#0E1424', onFill: '#121A2E', shadow: '#E8EEFA', danger: '#FF9585', onDanger: '#1A1414' } },
  lavender: { name: 'Lavender Mist', description: 'Dreamy lilac and rose',
    light: { background: '#F7F5FF', surface: '#FFFFFF', ink: '#1B1633', muted: '#4D4766', primary: '#B9A8FF', done: '#A6E3D8', accent: '#FFC7E5', action: '#5A3FC0', onAction: '#FFFFFF', onFill: '#1B1633', shadow: '#1B1633', danger: '#B42318', onDanger: '#FFFFFF' },
    dark:  { background: '#15112A', surface: '#221B3D', ink: '#EEEAFB', muted: '#B4ACD0', primary: '#A894FF', done: '#8FD6C9', accent: '#F5A9D3', action: '#C7B8FF', onAction: '#15112A', onFill: '#1B1633', shadow: '#EEEAFB', danger: '#FF9585', onDanger: '#1A1414' } },
  tangerine: { name: 'Tangerine Pop', description: 'Sunny, warm and energetic',
    light: { background: '#FFF6EC', surface: '#FFFFFF', ink: '#241A16', muted: '#5A4A40', primary: '#FF8A3D', done: '#A7E08F', accent: '#FFE066', action: '#B83C0A', onAction: '#FFFFFF', onFill: '#241A16', shadow: '#241A16', danger: '#B42318', onDanger: '#FFFFFF' },
    dark:  { background: '#1C130E', surface: '#2A1D16', ink: '#FBEFE6', muted: '#CDB8A9', primary: '#FF9A52', done: '#9AD484', accent: '#FFD95C', action: '#FFA866', onAction: '#1C130E', onFill: '#241A16', shadow: '#FBEFE6', danger: '#FF9585', onDanger: '#1A1414' } },
  matcha: { name: 'Matcha', description: 'Earthy greens and peach',
    light: { background: '#F6F8F1', surface: '#FFFFFF', ink: '#1E2519', muted: '#4D5646', primary: '#A9CF7A', done: '#CFEBD9', accent: '#FFC09A', action: '#2F7A55', onAction: '#FFFFFF', onFill: '#1E2519', shadow: '#1E2519', danger: '#B42318', onDanger: '#FFFFFF' },
    dark:  { background: '#11160F', surface: '#1B2318', ink: '#EDF3E6', muted: '#B3BFAA', primary: '#9CC46B', done: '#B5DCC3', accent: '#F4AF86', action: '#A9CF7A', onAction: '#11160F', onFill: '#1E2519', shadow: '#EDF3E6', danger: '#FF9585', onDanger: '#1A1414' } },
  nordic: { name: 'Nordic', description: 'Calm greys, steel and sand',
    light: { background: '#F4F6F8', surface: '#FFFFFF', ink: '#1A222C', muted: '#4A5563', primary: '#A7C4DA', done: '#BFE3D0', accent: '#E6DCCB', action: '#2F5577', onAction: '#FFFFFF', onFill: '#1A222C', shadow: '#1A222C', danger: '#B42318', onDanger: '#FFFFFF' },
    dark:  { background: '#12161B', surface: '#1D232B', ink: '#E9EDF1', muted: '#A7B0BB', primary: '#93B3CB', done: '#A8D3BC', accent: '#D6CBB8', action: '#A7C4DA', onAction: '#12161B', onFill: '#1A222C', shadow: '#E9EDF1', danger: '#FF9585', onDanger: '#1A1414' } },
};

/** Behind sheets and dialogs: the colour plus an opacity per mode. */
export const scrim = { light: { color: '#121A2E', opacity: 0.45 }, dark: { color: '#000000', opacity: 0.6 } } as const;

/** "R G B" triplets for NativeWind vars(): { '--color-background': '243 247 251', ... } */
export function themeVars(profile: ProfileId, mode: Mode): Record<string, string> {
  const set = profiles[profile][mode];
  const out: Record<string, string> = {};
  (Object.keys(set) as Role[]).forEach((role) => {
    const hex = set[role].replace('#', '');
    const n = parseInt(hex, 16);
    out[`--color-${role.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}`] = `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  });
  return out;
}

export const fonts = {
  display: { family: 'BricolageGrotesque', weights: [700, 800] },
  body: { family: 'Nunito', weights: [600, 700, 800] },
} as const;

/** Type scale in pt. letterSpacing in em. */
export const type = {
  wordmark: { family: 'display', size: 48, lineHeight: 52, weight: 800, letterSpacing: -0.02 },
  screenTitle: { family: 'display', size: 32, lineHeight: 36, weight: 800, letterSpacing: -0.01 },
  sectionTitle: { family: 'display', size: 22, lineHeight: 28, weight: 800 },
  petName: { family: 'display', size: 24, lineHeight: 30, weight: 700 },
  initial: { family: 'display', size: 20, lineHeight: 20, weight: 800 },
  listTitle: { family: 'body', size: 17, lineHeight: 22, weight: 800 },
  body: { family: 'body', size: 16, lineHeight: 24, weight: 700 },
  button: { family: 'body', size: 16, lineHeight: 20, weight: 800 },
  secondary: { family: 'body', size: 14, lineHeight: 20, weight: 600 },
  caption: { family: 'body', size: 13, lineHeight: 18, weight: 600 },
  label: { family: 'body', size: 13, lineHeight: 16, weight: 800, letterSpacing: 0.06, uppercase: true },
  guideHeading: { family: 'display', size: 22, lineHeight: 28, weight: 700 },
  guideBody: { family: 'body', size: 18, lineHeight: 28, weight: 600 },
} as const;

/** 4 pt steps. */
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 12: 48, gutter: 24, gutterNarrow: 16, tabClear: 112 } as const;
export const radius = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 } as const;
export const stroke = { outline: 2.5, icon: 2.5, avatar: 2, focus: 3 } as const;
export const size = { touch: 44, button: 52, chip: 48, tabBar: 68, icon: 24, fab: 56 } as const;
/** Hard shadow: a View offset behind the element, filled with the shadow role. Never a blurred native shadow. */
export const hardShadow = { offset: 3, offsetSmall: 2 } as const;
/** Sticker tilt for badges and reminder cards only. */
export const tilt = { sticker: -2 } as const;
export const motion = { press: 90, toggle: 180, sheet: 250, doneFill: 300, celebration: 600, undoWindow: 5000 } as const;
