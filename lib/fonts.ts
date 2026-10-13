import { DM_Sans, Instrument_Serif, Archivo, Manrope, Cormorant_Garamond } from 'next/font/google';

// Self-hosted via next/font: no render-blocking Google Fonts request and
// size-matched fallbacks (less layout shift while fonts load).
export const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--nf-dmsans' });
export const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap', variable: '--nf-instrument' });
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], display: 'swap', variable: '--nf-archivo' });
export const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--nf-manrope' });
export const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: '500', style: 'italic', display: 'swap', variable: '--nf-cormorant' });

export const fontVars = [dmSans, instrumentSerif, archivo, manrope, cormorant].map((f) => f.variable).join(' ');
