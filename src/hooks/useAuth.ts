import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!Object.values(context).length) {
    throw new Error('You must use this context within the provider tree');
  }

  return context;
}
