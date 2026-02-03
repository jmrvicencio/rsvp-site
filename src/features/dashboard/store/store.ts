import { Guest } from '../types';

import { createStore, atom } from 'jotai';

export const showOverlayAtom = atom(false);
export const editGuestAtom = atom<[string, Guest] | undefined>();

export const dashboardStore = createStore();
