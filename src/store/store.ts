import { Guest } from '@/features/dashboard/types';
import { createStore, atom } from 'jotai';

export const guestAtom = atom<Guest>({ nickname: '', invitees: { '': null } });
export const showMobileMenuAtom = atom<boolean>(false);

export const appStore = createStore();
