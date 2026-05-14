/**
 * OPTIMIZED SPLIT CONTEXT — UI slice
 */
import { createContext, useContext, useReducer } from 'react';

const initialUI = { theme: 'light', notification: null };

function uiReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload.theme };
    case 'SHOW_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
}

const UIStateContext = createContext(null);
const UIDispatchContext = createContext(null);

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUI);
  return (
    <UIStateContext.Provider value={state}>
      <UIDispatchContext.Provider value={dispatch}>
        {children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
}

export function useUIState() {
  const ctx = useContext(UIStateContext);
  if (ctx === null) throw new Error('useUIState must be used within UIProvider');
  return ctx;
}

export function useUIDispatch() {
  const ctx = useContext(UIDispatchContext);
  if (ctx === null) throw new Error('useUIDispatch must be used within UIProvider');
  return ctx;
}
