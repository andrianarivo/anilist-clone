---
trigger: always_on
---

## Antigravity Project Coding Guidelines

### File Naming
- **File names** must be **kebab-case** (e.g., `my-component.tsx`).
- **Component**, **hook**, and **class** names must be **PascalCase** (KamelCase) (e.g., `MyComponent`, `useMyHook`, `MyClass`).

### Folder Structure
- **`components/`** – stores **atomic, reusable UI components** that are not tied to any specific feature.
- **`features/`** – contains components that are **directly related to business logic**.
- **`hooks/`** – holds hooks **organized by feature**.
- **Mirrored sub‑folders** – the same sub‑folder layout should exist under `app/`, `features/`, and `hooks/`.  
  Example:
  hooks/search/anime/ features/search/anime/ app/search/anime/

### File Organization
- **One file per entity** – each hook, component, class, etc., lives in its own file.  
Example: `hooks/search/anime/use-most-popular.ts` for the `useMostPopular` hook.

### Apollo Queries
- **Never use lazy queries** unless explicitly required.
- **Default to `useQuery`** from Apollo Client for data fetching.