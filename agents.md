# AstroJr - Project Standards & Mission

## Mission

Create an immersive, educational cosmic exploration experience for children, using modern web technologies (Next.js, Three.js) and high-quality 3D assets.

## Tech Stack Standards

- **Framework**: Next.js 14+ (App Router, Server Components where possible).
- **Styling**: Tailwind CSS + Vanilla CSS for custom animations.
- **3D**: React Three Fiber + Drei for scene management.
- **State**: React Context or Zustand for global UI state (Info panels, focus).
- **Language**: TypeScript (strict mode).

## Coding Styles

- **Naming**:
  - Variables/Functions: `snake_case` (as per user rules).
  - Components: `PascalCase`.
  - Files: `kebab-case`.
- **Documentation**:
  - Every component and utility function must have a JSDoc block.
- **UI/UX**:
  - Focus: Mobile-First, Touch-friendly (min 44px targets).
  - Aesthetic: Premium Glassmorphism, Rounded corners (`rounded-2xl`+).
  - Fonts: 'Nunito' for readability.

## Directory Structure

- `src/app`: Routes and Layouts.
- `src/components/3d`: Three.js specific components (Planet, Stars, etc).
- `src/components/ui`: Interactive UI elements (Cards, Menus).
- `src/lib`: Logic, math helpers, database clients.
- `src/hooks`: Custom React hooks (useControls, useSpherePosition).

## Security

- API Routes must have rate limiting.
- Public assets served from CDN/Cloud Storage.
- Environment variables for all sensitive keys.
