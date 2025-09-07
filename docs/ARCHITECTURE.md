# Architecture Documentation

## System Overview

This service management system follows a modern full-stack architecture using Next.js 15 with the App Router, implementing a clear separation between server and client components for optimal performance and user experience.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Side                          │
├─────────────────────────────────────────────────────────────┤
│  Browser (React 19)                                         │
│  ├── Server Components (Static)                             │
│  │   ├── Services Page                                      │
│  │   └── Service Table                                      │
│  └── Client Components (Interactive)                       │
│      ├── ServiceFilters (Search & Filter)                  │
│      ├── ServiceForm (Create/Edit Modal)                   │
│      ├── ServiceActions (Dropdown Menu)                    │
│      └── DeleteServiceDialog (Confirmation)                │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 App Router                   │
├─────────────────────────────────────────────────────────────┤
│  Server Actions                                             │
│  ├── getServices() - Fetch with search/filter              │
│  ├── createService() - Create new service                  │
│  ├── updateService() - Update existing service             │
│  └── deleteService() - Remove service                      │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  Prisma ORM                                                 │
│  ├── Type-safe database queries                            │
│  ├── Connection pooling                                     │
│  └── Query optimization                                     │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
├─────────────────────────────────────────────────────────────┤
│  Service Collection                                         │
│  ├── Document-based storage                                │
│  ├── Flexible schema                                       │
│  └── Horizontal scaling                                    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Server Components
Server components run on the server and are rendered to HTML before being sent to the client. They have access to server-side resources and can perform data fetching directly.

**Services Page (`page.tsx`)**
- Fetches data server-side using `getServices()`
- Reads search parameters from URL
- Renders static HTML with service data
- Passes data to client components as props

**Benefits:**
- Faster initial page load
- Better SEO
- Reduced client-side JavaScript bundle
- Direct database access

### Client Components
Client components run in the browser and provide interactivity. They're marked with `"use client"` directive.

**ServiceFilters (`service-filters.tsx`)**
- Manages search input state
- Implements debounced search (1.5s delay)
- Updates URL parameters on search/filter change
- Provides real-time user feedback

**ServiceForm (`service-form.tsx`)**
- Modal dialog for create/edit operations
- Form validation and error handling
- Optimistic UI updates
- Handles form submission to server actions

**ServiceActions (`service-actions.tsx`)**
- Dropdown menu for service actions
- Prevents dropdown closure on dialog open
- Handles edit and delete operations

**DeleteServiceDialog (`delete-service-dialog.tsx`)**
- Confirmation dialog for destructive actions
- Prevents accidental deletions
- Provides clear user feedback

## Data Flow

### 1. Initial Page Load
```
URL → Server Component → getServices() → Prisma → MongoDB → HTML → Client
```

### 2. Search Operation
```
User Input → Debounce (1.5s) → URL Update → Server Re-render → New Data → UI Update
```

### 3. Create/Update Service
```
Form Submit → Server Action → Prisma → MongoDB → Cache Revalidation → UI Update
```

### 4. Delete Service
```
Confirmation → Server Action → Prisma → MongoDB → Cache Revalidation → UI Update
```

## State Management

### URL State
- Search terms and filters stored in URL parameters
- Enables bookmarking and sharing of filtered views
- Server components read from URL parameters
- Client components update URL via router

### Local State
- Form inputs and UI interactions
- Debounced search input
- Modal open/close states
- Loading and error states

### Server State
- Managed by Prisma and Next.js caching
- Automatically revalidated on mutations
- Optimistic updates for better UX

## Performance Optimizations

### Search Optimization
- **Debouncing**: Prevents excessive API calls during typing
- **Server-side Filtering**: Database-level filtering reduces data transfer
- **Caching**: Prisma query caching with revalidation tags

### Rendering Optimization
- **Server Components**: Reduces client-side JavaScript
- **Code Splitting**: Automatic with Next.js App Router
- **Streaming**: Progressive page loading

### Database Optimization
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Proper indexing and where clauses
- **Type Safety**: Compile-time error prevention

## Security Considerations

### Input Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- Type-safe form handling with TypeScript

### Data Protection
- Prisma ORM prevents SQL injection
- Type-safe database queries
- Proper error handling and logging

### Authentication & Authorization
- Server-side session management
- Protected routes and API endpoints
- CSRF protection built into Next.js

## Scalability Considerations

### Database Scaling
- MongoDB horizontal scaling
- Prisma connection pooling
- Query optimization and indexing

### Application Scaling
- Serverless deployment ready
- Edge runtime compatibility
- CDN-friendly static assets

### Code Organization
- Modular component architecture
- Reusable UI components
- Clear separation of concerns

## Error Handling

### Client-side Errors
- Form validation errors
- Network request failures
- User-friendly error messages

### Server-side Errors
- Database connection issues
- Validation failures
- Proper error logging and monitoring

### Error Boundaries
- Graceful error recovery
- Fallback UI components
- Error reporting and analytics

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Server action testing
- Utility function testing

### Integration Tests
- API endpoint testing
- Database integration testing
- User flow testing

### E2E Tests
- Full user journey testing
- Cross-browser compatibility
- Performance testing

## Deployment Architecture

### Development
- Local MongoDB instance
- Next.js development server
- Hot reloading and fast refresh

### Production
- MongoDB Atlas or self-hosted MongoDB
- Vercel or similar platform
- CDN for static assets
- Environment-based configuration

## Monitoring and Observability

### Performance Monitoring
- Core Web Vitals tracking
- Database query performance
- API response times

### Error Monitoring
- Client-side error tracking
- Server-side error logging
- User experience monitoring

### Analytics
- User behavior tracking
- Feature usage analytics
- Performance metrics
