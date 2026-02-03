import { useEffect, useState, type ReactNode } from 'react';
import { signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/auth';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function awaitAuth() {
      await auth.authStateReady();

      setLoading(false);
      setUser(auth.currentUser);
    }

    awaitAuth();
  }, []);

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      if (!loading) navigate('/');
      return;
    }

    user.getIdTokenResult().then((result) => {
      if (!('admin' in result.claims && result.claims.admin == true)) {
        setUser(null);
        signOut(auth);
        navigate('/');
      }
    });
  }, [loading, user]);

  return loading ? <>Loading</> : children;
}

export default ProtectedRoute;
