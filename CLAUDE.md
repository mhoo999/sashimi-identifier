# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 application built with TypeScript, React 19, and Tailwind CSS 4. The project appears to be named "sashmi-identifier" (likely "sashimi-identifier") and is in early development stages with a fresh Next.js setup.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.x with strict mode enabled
- **Styling**: Tailwind CSS 4 with PostCSS
- **Build Tool**: Turbopack (used for both dev and build)
- **State Management**: Zustand 5.0.8
- **UI Components**:
  - Radix UI primitives (Dialog, Slot)
  - Lucide React for icons
  - class-variance-authority for component variants
- **Media**: react-webcam for camera functionality

## Common Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

- **app/**: Next.js App Router directory
  - `page.tsx`: Main homepage component
  - `layout.tsx`: Root layout with Geist fonts
  - `globals.css`: Global styles with Tailwind
- **public/**: Static assets (SVGs, images)
- **Path aliases**: `@/*` maps to project root

## Key Configuration Details

- **TypeScript**: Uses ES2017 target with strict mode enabled
- **Module resolution**: Uses "bundler" strategy (Next.js 15 default)
- **ESLint**: Extends `next/core-web-vitals` and `next/typescript` configs
- **Fonts**: Uses Geist Sans and Geist Mono from next/font/google

## Development Notes

- The app uses Turbopack for both dev and build (via `--turbopack` flag)
- Camera/webcam functionality is available via react-webcam
- State management uses Zustand (lightweight alternative to Redux/Context)
- UI components likely follow shadcn/ui patterns (based on dependencies like clsx, tailwind-merge, class-variance-authority)
