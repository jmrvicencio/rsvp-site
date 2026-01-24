import { Guest, GuestRSVP } from '@/features/dashboard/types';
import { db } from '@/lib/firebase/firestore';
import { collection, doc, setDoc, updateDoc, type DocumentReference } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUpdateGuest = (guestId: string) => {
  const [submitting, setSubmitting] = useState(false);

  const updateGuest = async (data: Guest) => {
    try {
      const guestsCollection = collection(db, 'guests');
      const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;
      const date = new Date().getTime();
      // console.log('guest id: ', guestId, ', data: ', data, ', date: ', date);

      // console.log(data);

      setSubmitting(true);
      console.log({
        invitees: data.invitees,
        repliedAt: data.repliedAt,
      });
      await updateDoc(guestRef, {
        invitees: data.invitees,
        repliedAt: data.repliedAt,
      });
      // await setDoc(guestRef, data, { merge: true });

      setSubmitting(false);
      toast.success('Response Submitted');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      throw err;
    }
  };

  return { updateGuest, submitting };
};
