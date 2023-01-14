import {
  signOut as nextAuthSignOut,
  signIn as nextAuthSignIn,
} from 'next-auth/react';

export const signOut = (props?: any) => {
  if (typeof window === 'undefined') return null;

  localStorage.setItem('currentUser', "");
  return nextAuthSignOut(props);
};
export const signIn = nextAuthSignIn;

type OAuthProvider = "google" | "github" | "facebook" | "twitter";

export const handleOAuthClick = (provider: OAuthProvider, returnTo?: string) => {
  const isFullReturnHref = returnTo && returnTo.includes("http");
  const normalizedReturnTo = isFullReturnHref
    ? returnTo
    : `${window.location.origin}${returnTo}`;

  signIn(provider, {
    callbackUrl: normalizedReturnTo,
  });
};