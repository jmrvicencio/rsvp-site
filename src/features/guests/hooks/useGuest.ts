import { useEffect, useState } from 'react';
import { Guest } from '@/features/dashboard/types';
import { db } from '@/lib/firebase/firestore';
import { collection, doc, DocumentReference, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const useGuest = (id: string | null) => {
  const [guest, setGuest] = useState<Guest>();

  if (id == null) return { guest };

  const guestsCollection = collection(db, 'guests');
  const guestRef = doc(guestsCollection, id) as DocumentReference<Guest>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nextGuest = await getDoc(guestRef);
        setGuest(nextGuest.data());
      } catch (err) {
        const error = err as Error;

        toast.error(error.message);
        throw err;
      }
    };

    fetchData();
  });

  return { guest };
};
