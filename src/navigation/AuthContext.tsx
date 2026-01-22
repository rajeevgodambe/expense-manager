import { createContext } from 'react';

type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext({
  user: null,
  signIn: (user: any) => {},
  signOut: () => {},
});