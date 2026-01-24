import { Guest } from '@/features/dashboard/types';
import { db } from '@/lib/firebase/firestore';
import { collection, doc, updateDoc, type DocumentReference } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useSetGuest = (guestId: string) => {
  const [submitting, setSubmitting] = useState(false);

  const setGuest = async (data: Guest) => {
    try {
      const guestsCollection = collection(db, 'guests');
      const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;

      setSubmitting(true);
      await updateDoc(guestRef, {
        repliedAt: new Date().getTime(),
        invitees: data.invitees,
      });
      setSubmitting(false);
      toast.success('Response Submitted');

      return;
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);

      throw err;
    }
  };

  return { setGuest, submitting };
};
