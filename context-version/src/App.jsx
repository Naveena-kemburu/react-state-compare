/**
 * Root App — toggle between naive and optimized via URL param:
 *   ?mode=naive      → single AppContext (performance trap)
 *   ?mode=optimized  → split contexts (default, optimized)
 */
import AppNaive from './AppNaive';
import AppOptimized from './AppOptimized';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  return mode === 'naive' ? <AppNaive /> : <AppOptimized />;
}
