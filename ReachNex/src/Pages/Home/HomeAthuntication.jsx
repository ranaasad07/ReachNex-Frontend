import { createContext } from 'react';

const HomeAthentication = createContext({
     user: null,
  setUser: () => {},
});

export default HomeAthentication;
