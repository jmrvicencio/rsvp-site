import { useState } from 'react';
import { auth, provider } from '@/lib/firebase/auth';
import monogram from '/images/monogram.svg';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, [auth]);

  const handleSignInClicked = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      nav('/dashboard');
    } catch (err: any) {
      const error = err as Error;
      console.error(error);
      toast.error(err.code);

      throw err;
    }
  };

  return (
    <div className="font-playfair-display flex min-h-dvh w-full items-center justify-center">
      <div className="border-divider flex flex-col items-center rounded-xl border p-8">
        <img src={monogram} className="aspect-square h-24 w-24" />
        <h1 className="mt-8 mb-4 text-3xl font-bold">Admin Portal</h1>
        <input
          type="button"
          onClick={handleSignInClicked}
          value="Sign in with Google"
          className="text-playfair cursor-pointer rounded-lg bg-black/80 p-2 px-4 text-white"
        />
      </div>
    </div>
  );
}

export default Login;
