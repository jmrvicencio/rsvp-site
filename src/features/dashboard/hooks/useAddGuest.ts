import { v4 as uuid } from 'uuid';
import { db } from '@/lib/firebase/firestore';
import { setDoc, collection, doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { Guest } from '../types';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const useAddGuest = () => {
  const [submitting, setSubmitting] = useState(false);

  const addGuest = async (guest: Guest) => {
    if (submitting) return;

    try {
      const guestId = uuid();
      const guestsCollection = collection(db, 'guests');
      const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;

      setSubmitting(true);
      await setDoc(guestRef, guest);

      setSubmitting(false);
      return;
    } catch (err) {
      const error = err as Error;

      toast.error(error.message);
      throw err;
    }
  };

  const editGuest = async (guestId: string, guest: Guest) => {
    try {
      const guestsCollection = collection(db, 'guests');
      const guestRef = doc(guestsCollection, guestId) as DocumentReference<Guest>;

      setSubmitting(true);
      await setDoc(guestRef, guest);

      setSubmitting(false);
      return;
    } catch (err) {
      const error = err as Error;

      toast.error(error.message);
      throw err;
    }
  };

  return { addGuest, editGuest, submitting };
};
