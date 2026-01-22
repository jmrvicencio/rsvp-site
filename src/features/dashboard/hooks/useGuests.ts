import { useEffect, useState } from 'react';
import { Guest } from '../types';
import { collection, CollectionReference, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

export const useGuests = () => {
  const [guests, setGuests] = useState<[string, Guest][]>([]);

  useEffect(() => {
    const guestsCollection = collection(db, 'guests') as CollectionReference<Guest>;
    const q = query(guestsCollection, orderBy('nickname', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setGuests(snap.docs.map((doc) => [doc.id, doc.data()]));
      },
      (err) => {
        const error = err as Error;
        toast.error(error.message);
        throw err;
      },
    );

    return unsub;
  }, []);

  return { guests };
};
