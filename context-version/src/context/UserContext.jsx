/**
 * OPTIMIZED SPLIT CONTEXT — User slice
 */
import { createContext, useContext, useReducer } from 'react';

const initialUser = { name: 'Jane Doe', isLoggedIn: true };

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUser);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const ctx = useContext(UserStateContext);
  if (ctx === null) throw new Error('useUserState must be used within UserProvider');
  return ctx;
}

export function useUserDispatch() {
  const ctx = useContext(UserDispatchContext);
  if (ctx === null) throw new Error('useUserDispatch must be used within UserProvider');
  return ctx;
}
