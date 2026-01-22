import { v4 as uuid } from 'uuid';
import { db } from '@/lib/firebase/firestore';
import { setDoc, collection, doc, DocumentReference } from 'firebase/firestore';
import { Guest } from '../types';
import toast from 'react-hot-toast';

export const useAddGuest = () => async (guest: Guest) => {
  try {
    const guestId = uuid();
    const guestsCollection = collection(db, 'guests');
    const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;

    await setDoc(guestRef, guest);
  } catch (err) {
    const error = err as Error;

    toast.error(error.message);
    throw err;
  }
};
