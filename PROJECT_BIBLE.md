# PROJECT BIBLE
**Project:** DON'T CLOSE THIS TAB

## 1. Project Vision
This is not a website, portfolio, or greeting card. It is an **interactive journey** lasting 5–10 minutes. The primary goal is to create an emotional, mysterious, and deeply engaging experience that surprises the visitor constantly. The visitor should forget they are in a browser and feel like they are unraveling a carefully crafted puzzle made specifically for them.

## 2. User Experience Goals
- **Curiosity:** Every interaction should provoke the thought "What happens next?"
- **Surprise:** The project must reward exploration with unexpected micro-interactions.
- **Wonder:** The visitor should constantly ask "How did he build this?"
- **Safety:** Never manipulate, frighten, or create anxiety. The exploration must be purely enjoyable.

## 3. The Story
The website "wakes up" and connects to the user. It reveals that the creator has been waiting for them to open the page. There is a small game: 20 hidden secrets scattered throughout the experience. The final secret is the realization that the user themselves is the final piece of the puzzle. The flow must be a single continuous story with seamless transitions between scenes.

## 4. Visual Language
- **Style:** Premium, Minimal, Dark, Futuristic, Elegant.
- **Techniques:** Glassmorphism, soft glow, particles, blur, depth.
- **Exclusions:** No cheap effects, no generic templates, no plain solid colors without texture or depth. Everything must feel handcrafted.

## 5. Typography
- Modern, clean, and beautiful typography (e.g., Inter, Outfit).
- High contrast for readability, using font weights to establish hierarchy.

## 6. Color Palette
- **Base:** Deep, dark backgrounds (e.g., `#030303`, `#0a0a0a`).
- **Text:** Crisp white and muted gray/silver for secondary text.
- **Accents:** Distinct, elegant accent colors depending on the personalized path (e.g., subtle neon blue/purple for frontend, terminal green/amber for backend).

## 7. Animation Principles
Every animation must have a purpose:
- Create curiosity.
- Reward exploration.
- Improve immersion.
- Continue the story.
**No random animations.** Transitions must be premium, smooth, and seamless (no page reloads). Use micro-interactions to make the interface feel alive.

## 8. Interaction Principles
- The experience reacts ONLY to things happening INSIDE the browser (mouse movement, clicks, hover, scrolling, waiting, keyboard shortcuts, window resize, focus/blur, developer tools, console).
- **CRITICAL:** Never pretend to know private/personal information. No fake hacking. No accessing external data.

## 9. Dialogue Writing Rules
- **Language:** ALL visible text, dialogue, buttons, and notifications MUST be in **Russian**.
- **Tone:** Mysterious, personal, calm, and reassuring.
- **Format:** Messages appear slowly, with realistic typing delays.

## 10. Personalization Rules
The experience diverges immediately based on the initial choice: "Кто сегодня здесь?"
- **Акчолпон (Frontend Path):** Contains UI/UX jokes, CSS easter eggs, React jokes, design anomalies (e.g., hover states that break the layout).
- **Алфия (Backend Path):** Contains terminal jokes, server logs, database timeout jokes, API easter eggs.
The visitor must immediately feel: "This was made specifically for me."

## 11. Secret System
- **Total:** 20 secrets.
- **Rule:** Every important secret must be discoverable *inside* the website interface. Source code inspection is NOT required (though DevTools/Console can hold supplementary developer jokes).
- **Types:** Konami code, hidden buttons, waiting, resizing, double clicks, sequences, drag-and-drop puzzles.

## 12. Achievement System
- Unlocking secrets or performing specific actions grants achievements.
- **Titles (Russian):** Любопытный, Исследователь, Наблюдатель, Детектив, etc.
- **Visuals:** Premium, soft-glow notifications with a satisfying, non-intrusive UI sound effect.

## 13. Audio Principles
- **NO Background Music.**
- **UI Sounds Only:** Optional, soft, premium sound effects for achievements, clicks, and secret discoveries. No annoying or looping audio.

## 14. Folder & Naming Conventions
- **Source Code Language:** ALL code, variables, functions, folders, components, and comments MUST be in **English**.
- **Architecture:** Feature-Sliced Design (FSD). See `ARCHITECTURE.md`.
- **Component Names:** PascalCase (e.g., `OpeningSequence`).
- **Files/Folders:** kebab-case or PascalCase depending on the entity type.

## 15. The Immutables (Never Change These)
1. The UI is always in Russian; the code is always in English.
2. The site never reloads.
3. The site never fakes external data or hacking.
4. The 20 secrets requirement.
5. The specific target users (Акчолпон and Алфия).
