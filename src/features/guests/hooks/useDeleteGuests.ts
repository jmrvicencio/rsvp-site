import { Guest } from '@/features/dashboard/types';
import { db } from '@/lib/firebase/firestore';
import { collection, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const useDeleteGuests = () => async (guestIds: Set<string>) => {
  try {
    const guestsCollection = collection(db, 'guests');

    await Promise.all(
      [...guestIds].map((id) => {
        const guestRef = doc(guestsCollection, id) as DocumentReference<Guest>;
        return deleteDoc(guestRef);
      }),
    );
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    throw err;
  }
};
