// TODO(question): the docs do not name the localStorage key for the theme override.
export const THEME_STORAGE_KEY = 'furkin-theme';

export type Theme = 'light' | 'dark';

export function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Storage can be blocked. Fall through to the system preference.
  }

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The choice still applies for this view when storage is blocked.
  }
}

export const themeInitScript = `(function(){var theme='light';try{var stored=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(stored==='light'||stored==='dark'){theme=stored;}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){theme='dark';}}catch(e){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches)theme='dark';}catch(e2){}}document.documentElement.setAttribute('data-theme',theme);})();`;

export const headerScrollScript = `(function(){var onScroll=function(){var header=document.querySelector('.ws-header');if(!header)return;header.classList.toggle('is-scrolled',window.scrollY>8);};document.addEventListener('scroll',onScroll,{passive:true,capture:true});if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',onScroll);}else{onScroll();}})();`;
