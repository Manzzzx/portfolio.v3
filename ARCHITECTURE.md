# Architecture Documentation

## Overview

This portfolio website follows a **feature-based architecture** with **centralized configuration** and **separation of concerns**. The architecture is designed to be scalable, maintainable, and easy to understand.

## Design Principles

### 1. **Separation of Concerns**
- **Presentation Layer**: React components (`app/components/`)
- **Data Layer**: Data files and services (`lib/data/`, `lib/services/`)
- **Configuration Layer**: Centralized configs (`lib/config/`)
- **Type Layer**: TypeScript definitions (`lib/types/`)

### 2. **DRY (Don't Repeat Yourself)**
- Centralized configuration eliminates magic strings
- Reusable utility functions in `lib/utils.ts`
- Shared types in `lib/types/`

### 3. **Single Responsibility**
- Each component has one clear purpose
- Services handle business logic
- Components focus on presentation

### 4. **Scalability**
- Feature-based folder structure
- Easy to add new features without touching existing code
- Modular component design

## Folder Structure Rationale

```
app/
├── components/          # Presentational components
│   ├── projects/       # Project feature components
│   │   ├── ProjectCard.tsx      # Card display
│   │   ├── ProjectModal.tsx     # Detail modal
│   │   ├── DemoModal.tsx        # Demo iframe
│   │   └── index.ts             # Barrel export
│   ├── ui/             # Reusable UI components
│   └── Navbar.tsx      # Shared navigation

lib/
├── config/             # Centralized configuration
│   ├── app.config.ts          # App metadata, navigation, social
│   ├── theme.config.ts        # Colors, styling constants
│   └── tech-icons.config.ts   # Technology icon mappings
├── data/               # Data layer
│   └── projects.data.ts       # Project data (empty template)
├── services/           # Business logic
│   └── project.service.ts     # Project operations (filter, search)
└── types/              # TypeScript definitions
    └── project.types.ts       # Project interfaces
```

## Key Architectural Decisions

### 1. **Centralized Configuration**

**Problem**: Hardcoded values scattered across components make changes difficult.

**Solution**: All configuration in `lib/config/`

```typescript
// ❌ Before: Hardcoded in component
const THEME = {
  colors: {
    primary: "#8DD8FF"
  }
};

// ✅ After: Centralized config
import { THEME_CONFIG } from '@/lib/config/theme.config';
const primary = THEME_CONFIG.colors.primary;
```

**Benefits**:
- Single source of truth
- Easy to maintain and update
- Type-safe with TypeScript
- Better IDE autocomplete

### 2. **Service Layer Pattern**

**Problem**: Business logic mixed with presentation logic in components.

**Solution**: Separate service layer for data operations.

```typescript
// ❌ Before: Logic in component
const filtered = projects.filter(p => p.category === category);

// ✅ After: Service layer
import { ProjectService } from '@/lib/services/project.service';
const filtered = ProjectService.filterByCategory(category);
```

**Benefits**:
- Reusable business logic
- Easier to test
- Components stay focused on UI
- Consistent data operations

### 3. **Component Splitting**

**Problem**: Large monolithic components (471 lines) are hard to maintain.

**Solution**: Split into smaller, focused components.

```
ProjectCard.tsx (471 lines)
    ↓
ProjectCard.tsx (150 lines)
ProjectModal.tsx (80 lines)
DemoModal.tsx (50 lines)
```

**Benefits**:
- Easier to understand and modify
- Better code reusability
- Improved performance (code splitting)
- Easier to test individual components

### 4. **Barrel Exports**

**Problem**: Multiple import statements clutter code.

**Solution**: Barrel exports (`index.ts`) for cleaner imports.

```typescript
// ❌ Before: Multiple imports
import ProjectCard from '@/app/components/projects/ProjectCard';
import ProjectModal from '@/app/components/projects/ProjectModal';
import DemoModal from '@/app/components/projects/DemoModal';

// ✅ After: Single import
import { ProjectCard, ProjectModal, DemoModal } from '@/app/components/projects';
```

### 5. **Error Boundaries**

**Problem**: Runtime errors crash the entire app.

**Solution**: Error boundaries at route level.

- `app/error.tsx` - Catches errors in routes
- `app/loading.tsx` - Loading states
- `app/not-found.tsx` - 404 handling

**Benefits**:
- Graceful error handling
- Better user experience
- Easier debugging

## Data Flow

```
User Interaction
    ↓
Component (Presentation)
    ↓
Service Layer (Business Logic)
    ↓
Data Layer (Source of Truth)
    ↓
Type Layer (Type Safety)
```

### Example: Filtering Projects

```typescript
// 1. User clicks filter button
<button onClick={() => handleFilter("Web App")}>

// 2. Component calls service
const handleFilter = (category: string) => {
  const filtered = ProjectService.filterByCategory(category);
  setProjects(filtered);
};

// 3. Service performs business logic
static filterByCategory(category: ProjectCategory | "All"): Project[] {
  if (category === "All") return projectsData;
  return projectsData.filter(p => p.category === category);
}

// 4. Data comes from centralized source
import { projectsData } from '@/lib/data/projects.data';

// 5. Types ensure safety
interface Project {
  category: ProjectCategory;
  // ...
}
```

## State Management

Currently using **React built-in state** (useState, useEffect).

**Why no external state management?**
- Simple application with minimal shared state
- Most state is local to components
- Next.js App Router handles server state well

**When to add Redux/Zustand:**
- Complex global state requirements
- Multiple components sharing same state
- Need for time-travel debugging

## Performance Optimizations

### 1. **Next.js Image Optimization**
```typescript
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
/>
```

### 2. **Code Splitting**
- Automatic route-based splitting by Next.js
- Dynamic imports for heavy components (future)

### 3. **Memoization**
```typescript
const handleScroll = useCallback(() => {
  // Scroll logic
}, [dependencies]);
```

### 4. **Lazy Loading**
- Images load on demand
- Modals only render when open

## Security Considerations

### 1. **Environment Variables**
- Sensitive data in `.env` (gitignored)
- Public vars prefixed with `NEXT_PUBLIC_`
- Template in `.env.example`

### 2. **Iframe Sandbox**
```typescript
<iframe
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  // ...
/>
```

### 3. **Link Security**
```typescript
<a
  target="_blank"
  rel="noopener noreferrer"  // Prevents tabnabbing
  // ...
/>
```

## Accessibility

### 1. **Semantic HTML**
```typescript
<nav role="navigation" aria-label="Main navigation">
<button aria-label="Close modal">
```

### 2. **Keyboard Navigation**
```typescript
onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    // Handle action
  }}
}
```

### 3. **ARIA Attributes**
```typescript
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
```

## Testing Strategy (Future)

### Unit Tests
- Service layer functions
- Utility functions
- Helper functions

### Component Tests
- Render tests
- User interaction tests
- Snapshot tests

### E2E Tests
- Critical user flows
- Navigation
- Form submissions

## Deployment Architecture

```
GitHub Repository
    ↓
Vercel (CI/CD)
    ↓
Build & Deploy
    ↓
Edge Network (CDN)
    ↓
Users
```

**Benefits of Vercel:**
- Automatic deployments on push
- Preview deployments for PRs
- Edge caching for performance
- Built-in analytics

## Future Improvements

### 1. **Custom Hooks**
Extract reusable logic:
```typescript
// lib/hooks/useScrollVisibility.ts
export function useScrollVisibility(threshold = 0.25) {
  // Scroll logic
}
```

### 2. **API Routes**
For dynamic data:
```typescript
// app/api/projects/route.ts
export async function GET() {
  // Fetch from database
}
```

### 3. **Database Integration**
Replace static data with database:
- Prisma + PostgreSQL
- MongoDB
- Supabase

### 4. **CMS Integration**
For non-technical content updates:
- Sanity
- Contentful
- Strapi

### 5. **Animation Library**
More complex animations:
- GSAP
- Lottie

## Conventions

### Naming
- **Components**: PascalCase (`ProjectCard.tsx`)
- **Functions**: camelCase (`filterProjects`)
- **Constants**: UPPER_SNAKE_CASE (`THEME_CONFIG`)
- **Types**: PascalCase (`ProjectCategory`)

### File Organization
- One component per file
- Related components in same folder
- Barrel exports for public API

### Comments
- JSDoc for public APIs
- Inline comments for complex logic
- TODO comments for future improvements

## Conclusion

This architecture provides:
- ✅ **Scalability**: Easy to add new features
- ✅ **Maintainability**: Clear structure and separation
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Performance**: Optimized with Next.js
- ✅ **Developer Experience**: Great DX with modern tools

For questions or suggestions, please open an issue on GitHub.
