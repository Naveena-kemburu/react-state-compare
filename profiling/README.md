# Profiling Screenshots

Place your React DevTools Profiler screenshots here after running the benchmarking protocol.

## Required Files

| File | Description |
|------|-------------|
| `context-naive-profile.png` | Flame graph after 10 "Add to Cart" clicks — naive single-context version. Shows widespread re-renders across the entire tree. |
| `context-optimized-profile.png` | Flame graph after 10 "Add to Cart" clicks — split-context version. Only cart-related components re-render. |
| `zustand-profile.png` | Flame graph after 10 "Add to Cart" clicks — Zustand version. Selector-based subscriptions limit re-renders to relevant components. |
| `redux-toolkit-profile.png` | Flame graph after 10 "Add to Cart" clicks — RTK version. `useSelector` with primitive selectors prevents unnecessary re-renders. |

## How to Capture

1. Install the [React Developer Tools](https://react.dev/learn/react-developer-tools) browser extension.
2. Open the app in development mode (`npm run dev`).
3. Open DevTools → **Profiler** tab.
4. Check **"Record why each component rendered"**.
5. Click ▶ **Start profiling**.
6. Click "Add to Cart" on the first product **10 times**.
7. Click ⏹ **Stop profiling**.
8. Screenshot the resulting flame graph and save it here.
