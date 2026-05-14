import { useAppContext } from '../context/AppContext';
import { useUIState, useUIDispatch } from '../context/UIContext';

function ThemeSwitcherNaive() {
  const { state, dispatch } = useAppContext();
  const theme = state.ui.theme;
  return (
    <button
      className="theme-btn"
      onClick={() => dispatch({ type: 'SET_THEME', payload: { theme: theme === 'light' ? 'dark' : 'light' } })}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

function ThemeSwitcherOptimized() {
  const { theme } = useUIState();
  const dispatch = useUIDispatch();
  return (
    <button
      className="theme-btn"
      onClick={() => dispatch({ type: 'SET_THEME', payload: { theme: theme === 'light' ? 'dark' : 'light' } })}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default function ThemeSwitcher({ mode = 'optimized' }) {
  return mode === 'naive' ? <ThemeSwitcherNaive /> : <ThemeSwitcherOptimized />;
}
