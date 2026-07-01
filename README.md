# AltKomik Mobile

Welcome to the AltKomik Mobile repository! This project is built using Expo, React Native, and Gluestack UI.

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the application**
   ```bash
   pnpm dev
   ```

---

## Project Architecture (Feature-Sliced Design)

This project uses a **Feature-Sliced / Domain-Driven Structure** to keep the codebase clean, scalable, and easy to maintain. We strictly separate the routing logic from the actual UI and business logic.

### 1. Separation of Routing and UI
- **`src/app/`**: This directory is strictly used for **routing** via Expo Router. Files here contain minimal code and simply import and export the respective view from the `src/screens` folder.

### 2. Screen Architecture (`src/screens/`)
Each tab or page in the application (e.g., `home`, `library`, `detail`) has its own dedicated folder inside `src/screens/`. This ensures that everything related to a specific feature is kept isolated and organized.

Inside a typical screen folder (e.g., `src/screens/home/`), you will find the following structure:

- 📄 **`index.tsx`**: The main entry point and UI View for the screen. It combines smaller components and hooks into a single page.
- 📁 **`components/`**: UI components that are **strictly specific** to this screen (e.g., a `HomeCarousel`). Note: Global components (like a standard `Button` or `ComicCard`) live in `src/components/`.
- 📁 **`hooks/`**: Custom React hooks containing the business logic and state management for this screen.
- 📄 **`repository.ts`**: The data access layer. All API calls, data fetching, and data formatting for this screen are handled here. This separates data operations from the UI.
- 📄 **`types.ts`**: TypeScript interfaces and types specific to this screen's data and props.
- 📄 **`utils.ts`**: Small helper functions and formatters used locally within this screen.

### Why this structure?
- **Highly Organized**: If there is a bug on the Home page, you know exactly where to look (`src/screens/home/`) without digging through global folders.
- **Prevents File Bloat**: By extracting logic into `hooks`, data fetching into `repository`, and UI into `components`, the main `index.tsx` file stays clean and short.
- **Team-Friendly**: Developers can work on different screens simultaneously with minimal risk of merge conflicts.

### 3. TypeScript Conventions
- **Strictly `type` over `interface`**: In this codebase, we exclusively use `type` for defining types and props (e.g., `type ComponentProps = { ... }`). We do **not** use `interface`. This convention is enforced across the entire repository to maintain consistency.
