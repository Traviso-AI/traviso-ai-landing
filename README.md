# Traviso AI Landing Page

**Version 2.0** - Clean rebuild replacing v1.0
by Nic M Rayce (https://www.github.com/nicmrayce)

A modern, clean landing page for Traviso AI - The World's First Social AI Travel Concierge.

---

## Version 2.0 - UI, Security & Performance Update

This build (v2.0) replaces the previous v1.0 build which was created using Lovable.dev's template. The rebuild was necessary due to a security/performance issue - and to stay away from Lovable generated AI code and uses a more reliable manually built production-grade code.

### Issue Identified in v1.0

**Problematic Package: `lovable-tagger`**

The original v1.0 build included `lovable-tagger` (v1.1.7) as a dev dependency, which was automatically added by the Lovable.dev platform. This package triggered Windows Defender alerts due to:

1. **Postinstall Scripts**: The package executes postinstall scripts that modify project files
2. **File System Access**: Windows Defender flagged the package's file modification behavior as potentially malicious
3. **Installation Failures**: The security alerts caused repeated installation failures (EBUSY, EPERM errors)
4. **Network Timeouts**: The combination of security scans and file locking caused extended installation times

### Resolution

**Complete Clean Rebuild:**

- Removed `lovable-tagger` and all Lovable.dev-specific dependencies
- Removed 60+ unnecessary packages (shadcn-ui bloat, unused Radix UI components)
- Reduced dependencies from 60+ to **11 essential packages**
- Eliminated all postinstall scripts that trigger security alerts
- Clean installation now completes in 5-10 minutes (vs hours in v1.0)

### What Was Removed

- `lovable-tagger` - The problematic package causing Windows Defender alerts
- 28+ Radix UI packages - Unused component libraries
- `@tanstack/react-query` - Not needed for static landing page
- `react-hook-form`, `zod`, `@hookform/resolvers` - Form libraries (unused)
- `recharts`, `react-day-picker`, `input-otp`, `cmdk`, `vaul` - Unused utilities
- `next-themes`, `date-fns`, `react-resizable-panels` - Unused dependencies
- ESLint configuration - Simplified build process

### What Was Kept

- All core functionality (Hero, Navigation, Footer components)
- Design system (glass morphism, Apple-like styling)
- All assets and images
- Vite + React + TypeScript stack
- Tailwind CSS with custom styling
- React Router for routing

---

## Installation Instructions

```bash
# Install dependencies 
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

**Total: Only 11 dependencies** (vs 60+ in v1.0)

## Project Structure

```
src/
├── components/     # Reusable components
│   ├── Button.tsx  # Simple button (no Radix UI)
│   ├── Card.tsx    # Simple card component
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   └── Footer.tsx
├── pages/          # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── assets/         # Images and static files
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Design Features

- **Glass Morphism UI** - Modern frosted glass effects
- **Apple-like Design** - Clean, minimal, white aesthetic
- **DM Sans Font** - Professional typography
- **Responsive** - Mobile-first design
- **Smooth Animations** - Fade-in and hover effects

## Deployment

This project is optimized for deployment on **Vercel**.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

The build output will be in the `dist` folder, which Vercel will serve automatically.

### Custom Domain

You can connect a custom domain directly in Vercel's project settings.

---

## Migration Notes

If you're migrating from v1.0:

1. **Backup your assets**: Copy `src/assets/` folder
2. **Install v2.0**: Fresh `npm install` (much faster now!)
3. **Restore assets**: Copy your images back to `src/assets/`
4. **Test**: Run `npm run dev` to verify everything works

## Performance Improvements

- **Installation Time**: 5-10 minutes (vs 30+ minutes in v1.0)
- **Dependencies**: 11 packages (vs 60+ in v1.0)
- **Build Size**: Significantly smaller bundle
- **Security**: No postinstall scripts or suspicious packages
- **Reliability**: No Windows Defender conflicts

---

---

## Recent Modifications (Major Revamp)

### New Dependencies Added

- **`motion`** (v12.23.26) - Animation library for blur reveal effects on text and images

### New Components

- **`BlurText.tsx`** - Reusable component for animated text blur reveal effects
  - Supports word-by-word or character-by-character animation
  - IntersectionObserver-based scroll-triggered animations
  - Configurable delay, direction, and animation keyframes
  - Supports custom HTML element types (p, span, div, h1-h6)
  - Gradient text support via `spanClassName` prop

- **`BlurImage.tsx`** - Reusable component for animated image blur reveal effects
  - Scroll-triggered blur reveal for PNG images
  - Staggered animation delays for grid layouts
  - Same animation system as BlurText for consistency

### Hero Section Updates

**Background & Styling:**
- Changed background color from gradient to solid `#F6F9FE`
- Added `moving_bg.mp4` as background video with:
  - 10% opacity
  - Horizontal flip (scaleX(-1))
  - Absolute positioning covering entire section
  - Autoplay, muted, loop enabled

**Content Layout:**
- Removed `first_fold_1.png` image overlay
- Video now displays directly without image wrapper
- Hero text positioned with `margin-top: 200px` on desktop only
- Video positioned with `margin-top: -50px` on desktop
- Section height constrained to `h-screen` (100vh) to prevent overflow
- Removed all styling/borders/shadows from video element

**Text Animations:**
- "The World's First" - BlurText with word-by-word animation
- "Social AI Travel Concierge" - BlurText with gradient styling (blue gradient)
- Subtitle text - BlurText with word-by-word animation
- All text animations trigger on scroll into viewport

**Video Updates:**
- Updated video source to `nala_animation_with_phone_v3.mp4`
- Video playback isolated from animation effects
- Custom loop logic: plays full video once, then loops from 2 seconds onwards
- Video container completely separate from BlurText/BlurImage animations

### Navigation Updates

**Scroll-Based Styling:**
- Transparent background and no shadow when scroll position is 0px
- Glass morphism effect and border appear when scroll >= 10px
- Smooth transitions between states
- Uses IntersectionObserver for scroll detection

### Section Components Updates

**Features Section:**
- Heading uses BlurText component
- All PNG feature cards use BlurImage component
- Staggered animation delays (100ms + index * 50ms)

**Top Creators' Trips Section:**
- Heading uses BlurText component
- All PNG hotel cards use BlurImage component
- Staggered animation delays (100ms + index * 50ms)

**Before Footer Section:**
- All PNG images use BlurImage component
- Staggered animation delays (100ms + index * 50ms)

### Animation Behavior

- **Trigger**: All blur reveal animations trigger when elements scroll into viewport
- **Exclusion**: MP4 videos are explicitly excluded from blur effects
- **Performance**: Uses `will-change` CSS property for optimized animations
- **IntersectionObserver**: Efficient scroll detection with configurable threshold and rootMargin

### File Changes

**Removed:**
- `first_fold_1.png` - No longer used as video overlay

**Updated Video Sources:**
- Background: `moving_bg.mp4` (new)
- Hero video: `nala_animation_with_phone_v3.mp4` (updated from v2)

### Technical Notes

- All blur animations use `motion/react` from the motion package
- Animations are non-blocking and don't interfere with video playback
- Video elements are isolated from animation containers
- Responsive: Animations work on all screen sizes, with mobile-specific adjustments where needed

---

## License

© 2025 Traviso AI. All rights reserved.
