# ARCHITECTURE

## 1. Complete Folder Tree
This project strictly follows a scalable architecture inspired by Feature-Sliced Design (FSD).

```text
src/
├── app/                  # Application initialization, global providers, root App component
├── pages/                # Top-level route components (e.g., ExperiencePage)
├── widgets/              # Independent, complex blocks (e.g., OpeningSequence, UserSelection, ProgressIndicator)
├── features/             # User interactions and business logic (e.g., StoryManager, SecretTrigger)
├── entities/             # Business entities (e.g., Secret, Achievement models)
├── shared/               # Reusable primitives and shared code
│   ├── ui/               # Base UI components (Button, Modal, Toast)
│   ├── hooks/            # Global custom hooks (useKeyboardSequence, useMousePosition)
│   ├── utils/            # Helper functions (cn for tailwind, math utils)
│   ├── assets/           # Images, fonts, sound effects
│   ├── lib/              # Third-party library configurations
│   └── styles/           # Global CSS, Tailwind layers
├── animations/           # GSAP timelines, Framer Motion variants
├── dialogs/              # Static dialogue data
│   ├── akcholpon.ts
│   └── alfiya.ts
├── achievements/         # Achievement definitions and triggers
├── secrets/              # Isolated secret modules
│   ├── secret01/         # e.g., Konami Code
│   ├── secret02/         # e.g., Hover Anomaly
│   └── ...
├── providers/            # React Context providers (ExperienceProvider)
├── store/                # Global state (if not using Context, e.g., Zustand)
├── types/                # Global TypeScript declarations
├── constants/            # Global constants (Timers, Limits)
└── main.tsx              # React DOM entry point
```

## 2. Component Hierarchy
- `App.tsx` remains almost completely empty. It wraps the application in `ExperienceProvider` and renders `StoryManager`.
- `StoryManager` acts as the orchestrator. It listens to state (e.g., `isIntroComplete`, `userPath`) and mounts/unmounts `Widgets` or `Pages` with seamless transitions.
- `Widgets` compose `Features` and `Entities`.
- `Shared UI` components must be completely dumb and reusable.

## 3. State Management & Context Architecture
- **Context:** `ExperienceContext` is the single source of truth for the user's progress.
- **State Stored:**
  - `userPath`: `'akcholpon' | 'alfiya' | null`
  - `secretsFound`: `string[]` (IDs of discovered secrets)
  - `achievementsUnlocked`: `string[]` (IDs of unlocked achievements)
  - `currentStage`: Enum representing the current narrative stage.

## 4. Hooks
- **Global:** `useExperience()` to access context safely.
- **Utility:** Custom hooks for specific browser APIs (e.g., `useWindowResize`, `useIdle`, `useConsoleOpen`).
- **Feature:** Custom hooks inside `/features` to isolate complex component logic.

## 5. Utilities
- `cn(...classes)`: Combines `clsx` and `tailwind-merge` to allow robust, overrideable utility classes on shared components.

## 6. Animation System
- **Framer Motion:** Used for declarative, state-driven UI animations (e.g., unmounting, hover states, layout animations).
- **GSAP:** Used for complex sequences, sequenced typography reveals, and scroll/cursor-tied timelines.
- **Styles:** Premium CSS glassmorphism, glowing borders, and particle backgrounds via Canvas/Three.js or CSS.

## 7. Secret Engine
- Every secret is structurally isolated inside `src/secrets/`.
- A secret component is injected globally (or at specific layout layers) and acts as an invisible listener or a disguised UI element.
- When triggered, it calls `discoverSecret(id)` from the `ExperienceContext` and plays its local animation.

## 8. Achievement Engine
- Handled by a global `<AchievementOverlay />` sitting at the highest z-index.
- Listens to the `achievementsUnlocked` array. When a new ID is added, it pushes a premium toast notification to the screen with a subtle sound effect.

## 9. Future Module Integration
- **Step-by-Step execution:** New secrets or features are added simply by creating a new folder in `src/secrets/` and importing the listener component into the main orchestrator.
- Existing components do not need to be refactored to add new secrets.

## 10. Performance Strategy
- **Lazy Loading:** Delay loading Heavy animations or 3D elements until the intro is complete.
- **DOM Size:** Clean up unmounted secrets. If a secret is found, its listener is removed to save memory and CPU cycles.
- **Animations:** Hardware accelerate via `transform` and `opacity`. Avoid animating `box-shadow` or `filter` heavily unless necessary for the glass effect.
