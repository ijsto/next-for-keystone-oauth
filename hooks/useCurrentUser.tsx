import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { CURRENT_USER_Q } from '@/graphql/queries/CURRENT_USER_Q';

import { signOut } from '@/lib/auth';


export const useCurrentUser = () => {
  const { data, loading } = useQuery(CURRENT_USER_Q);

  const currentUser = data?.authenticatedItem;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const storageUser = {
    email: undefined,
    id: undefined,
  };

  const email = currentUser?.email || storageUser?.email;

  const coreUserProps = {
    isLoggedIn: Boolean(currentUser?.id || storageUser?.id),
    signOut,
    userId: currentUser?.id || storageUser?.id,
    email
  };

  if (loading) return { ...storageUser, loading: true };
  if (!currentUser && !storageUser) return { loading: false };

  return {
    ...storageUser,
    ...currentUser,
    ...coreUserProps,
  };
};
