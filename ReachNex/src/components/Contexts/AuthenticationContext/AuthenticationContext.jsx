import { createContext } from 'react';

const AuthenticationContext = createContext({
     user: null,
  setUser: () => {},
});

export default AuthenticationContext;
