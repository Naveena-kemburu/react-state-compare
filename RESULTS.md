# Benchmark Results: React State Management Comparison

## Summary Table

| Metric | Context (naive) | Context (split) | Zustand | Redux Toolkit |
|--------|----------------|-----------------|---------|---------------|
| **Re-renders on "Add to Cart" (10×)** | ~80–100 total | ~20–25 total | ~15–20 total | ~15–20 total |
| **Header re-renders** | 10 | 10 | 1 | 1 |
| **ProductList re-renders** | 10 | 1 | 1 | 1 |
| **ProductCard re-renders (each)** | 10 | 1 | 1 | 1 |
| **CartSidebar re-renders** | 10 | 10 | 10 | 10 |
| **CartItem re-renders** | 10 | 10 | 10 | 10 |
| **State management bundle size (gzipped)** | 0 KB | 0 KB | ~3 KB | ~16 KB |
| **State management files (LOC)** | ~80 | ~150 | ~70 | ~120 |
| **Files created for state** | 1 | 3 | 1 | 4 |
| **Provider boilerplate** | 1 provider | 3 providers | None | 1 `<Provider>` |
| **Time-travel debugging** | ❌ | ❌ | ❌ (opt-in via middleware) | ✅ Built-in |
| **DevTools integration** | React DevTools only | React DevTools only | Redux DevTools (via middleware) | Redux DevTools (built-in) |
| **Learning curve** | Low | Low–Medium | Low | Medium–High |

> **Note:** Re-render counts are from development mode with StrictMode disabled. With StrictMode enabled, counts double due to intentional double-invocation.

---

## Profiler Screenshots

### Context API — Naive (single context)
![Context Naive Profile](profiling/context-naive-profile.png)

*Observation: Every component in the tree re-renders on each "Add to Cart" action because all state lives in one context. UserInfo, ThemeSwitcher, and ProductCard components that don't need cart data still re-render.*

### Context API — Optimized (split contexts)
![Context Optimized Profile](profiling/context-optimized-profile.png)

*Observation: After splitting into CartContext, UserContext, and UIContext, only components subscribed to CartContext re-render when cart state changes. UserInfo and ThemeSwitcher are now silent.*

### Zustand
![Zustand Profile](profiling/zustand-profile.png)

*Observation: Selector-based subscriptions mean only components whose selected slice changed re-render. Header re-renders only when cartItemCount changes (a primitive), not on every cart mutation.*

### Redux Toolkit
![Redux Toolkit Profile](profiling/redux-toolkit-profile.png)

*Observation: `useSelector` with primitive/stable selectors produces the same targeted re-render pattern as Zustand. The flame graph is nearly identical in shape.*

---

## Bundle Analysis Screenshots

### Zustand Bundle
![Zustand Bundle](bundle-analysis/zustand-bundle.png)

### Redux Toolkit Bundle
![Redux Toolkit Bundle](bundle-analysis/redux-toolkit-bundle.png)

---

## Key Findings

### Re-render Analysis

**Context API (naive):** The single-context approach is the worst performer. Every `dispatch` call triggers a re-render in every component that calls `useContext(AppContext)`, regardless of whether the data they consume changed. In our 10-click test, `ProductList` and `UserInfo` re-rendered 10 times each despite having no dependency on cart state.

**Context API (optimized):** Context splitting dramatically reduces unnecessary re-renders. By separating `CartContext`, `UserContext`, and `UIContext`, components subscribe only to what they need. `UserInfo` drops from 10 re-renders to 0 during cart operations. The trade-off is more boilerplate — three providers, three reducers, three dispatch contexts.

**Zustand:** Out-of-the-box performance matches the optimized Context approach with far less code. The selector pattern (`useAppStore(s => s.cart.isOpen)`) is the key — Zustand performs a strict equality check on the selector's return value and skips re-renders when it hasn't changed. No providers needed.

**Redux Toolkit:** Identical re-render behavior to Zustand when selectors are written correctly. The `useSelector` hook uses the same strict equality check. The additional structure (slices, configureStore, Provider) pays off in large teams through enforced conventions and unparalleled debugging via Redux DevTools.

### Bundle Size

- **Context API:** Zero additional bytes — it's built into React.
- **Zustand:** ~3 KB gzipped. Extremely lightweight for what it provides.
- **Redux Toolkit + react-redux:** ~16 KB gzipped. Larger, but includes Immer, Redux Thunk, and the full DevTools integration infrastructure.

### Boilerplate

- **Context (naive):** 1 file, ~80 LOC. Simple to start, painful to scale.
- **Context (split):** 3 files, ~150 LOC. More files but each is focused.
- **Zustand:** 1 file, ~70 LOC. The least boilerplate of all three.
- **Redux Toolkit:** 4 files, ~120 LOC. More files but each slice is self-contained and testable in isolation.

---

### Decision Guide

#### Choose Context API when:
- Building a **small to medium application** (< 10 components sharing state).
- You want **zero dependencies** and are comfortable with React primitives.
- The state is relatively **static** (e.g., theme, locale, auth status) and doesn't change frequently.
- **Always use split contexts** — never put all state in one context in a real app.
- Avoid it for high-frequency state updates (cart, real-time data) where re-render cascades become a problem.

#### Choose Zustand when:
- You need **better performance than Context** with minimal boilerplate.
- Building a **medium-sized application** or a feature within a larger app.
- Your team values **simplicity and fast iteration** over strict conventions.
- You want **no provider wrapping** — Zustand stores work outside React components too (useful for utilities, tests).
- The application doesn't require complex debugging workflows or strict action logging.
- **Best fit:** dashboards, SaaS tools, internal apps, indie projects.

#### Choose Redux Toolkit when:
- Building a **large-scale application** with multiple developers.
- You need **time-travel debugging** and a full audit trail of every state change.
- The team benefits from **enforced conventions** — every state change goes through a named action, making bugs traceable.
- You're working in a domain where **predictability is critical** (fintech, healthcare, e-commerce at scale).
- You need **complex async flows** — RTK Query (included in RTK) is the best-in-class solution for server state management.
- **Best fit:** enterprise applications, large teams, projects that will be maintained for years.

#### The Pragmatic Rule of Thumb

| App Size | Team Size | Recommendation |
|----------|-----------|----------------|
| Small | Solo / 2 | Context API (split) |
| Small–Medium | 2–5 | Zustand |
| Medium–Large | 5–15 | Zustand or RTK |
| Large / Enterprise | 15+ | Redux Toolkit |

The most important insight from this benchmark: **the performance gap between optimized Context, Zustand, and RTK is negligible in practice**. The real differentiator is developer experience, debugging capability, and how well each tool scales with team size and application complexity.
