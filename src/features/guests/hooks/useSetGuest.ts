import { Guest } from '@/features/dashboard/types';
import { db } from '@/lib/firebase/firestore';
import { collection, doc, setDoc, type DocumentReference } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const useSetGuest = (guestId: string) => async (data: Guest) => {
  const guestsCollection = collection(db, 'guests');
  const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;

  try {
    await setDoc(guestRef, data);
    return;
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);

    throw err;
  }
};
