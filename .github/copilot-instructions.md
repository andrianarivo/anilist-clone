# GitHub Copilot Project Instructions

## Antigravity Project Coding Guidelines

- **File Naming:**
  - Use **kebab-case** for all file names (e.g., `my-component.tsx`).
  - Use **PascalCase** for all component, hook, and class names (e.g., `MyComponent`, `useMyHook`, `MyClass`).

- **Folder Structure:**
  - Place **atomic, reusable UI components** in `components/`.
  - Place **business logic-related components** in `features/`.
  - Place **hooks** in `hooks/`, organized by feature.
  - Mirror sub-folder layouts across `app/`, `features/`, and `hooks/` (e.g., `hooks/search/anime/`, `features/search/anime/`, `app/search/anime/`).

- **File Organization:**
  - Only one entity per file (e.g., one hook, component, or class per file).
  - Example: `hooks/search/anime/use-most-popular.ts` for the `useMostPopular` hook.

- **Apollo Queries:**
  - Use `useQuery` from Apollo Client by default for data fetching.
  - Only use lazy queries if explicitly required.

**Copilot, always follow these rules when generating code for this project.**
