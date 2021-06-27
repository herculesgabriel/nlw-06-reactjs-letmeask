import { useState, useEffect, createContext, ReactNode } from 'react';

import { firebase, firebaseAuth } from '../services/firebase';

type User = {
  name: string;
  id: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, uid, photoURL } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing user information');
        }

        setUser({
          name: displayName,
          id: uid,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebaseAuth.signInWithPopup(provider);

    if (!response.user) {
      throw new Error('Authentication failed');
    }

    const { displayName, uid, photoURL } = response.user;

    if (!displayName || !photoURL) {
      throw new Error('Missing user information');
    }

    setUser({
      name: displayName,
      id: uid,
      avatar: photoURL
    });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
