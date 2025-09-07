# Service Management System

A modern, full-stack service management application built with Next.js 15, Prisma, MongoDB, and TypeScript. This project demonstrates best practices for building scalable web applications with server-side rendering, client-side interactivity, and efficient data management.

## 🚀 Features

### Core Functionality
- **Service Management**: Complete CRUD operations for services
- **Advanced Search**: Debounced search across service names and descriptions
- **Filtering**: Status-based filtering (Active/Inactive/All)
- **Real-time Updates**: Optimistic UI updates with server-side revalidation
- **Form Validation**: Client and server-side validation with error handling
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features
- **Server Components**: Leverages Next.js 15 server components for optimal performance
- **Client Components**: Strategic use of client components for interactivity
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Database Integration**: MongoDB with Prisma ORM for type-safe database operations
- **URL State Management**: Search and filter states persisted in URL parameters
- **Debounced Search**: 1.5-second debounce to optimize API calls and improve UX

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend
- **Prisma 6.15.0** - Database ORM
- **MongoDB** - NoSQL database
- **Next.js API Routes** - Server-side API endpoints

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundling
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (account)/               # Account pages group
│   ├── (auth)/                  # Authentication pages group
│   ├── (dashboard)/             # Dashboard pages group
│   │   └── dashboard/
│   │       └── services/        # Service management pages
│   │           ├── page.tsx     # Main services page (server component)
│   │           ├── service-filters.tsx    # Search & filter component
│   │           ├── service-form.tsx      # Create/edit form component
│   │           ├── service-actions.tsx   # Dropdown actions component
│   │           └── delete-service-dialog.tsx # Delete confirmation
│   ├── (public-pages)/          # Public pages group
│   └── globals.css              # Global styles
├── actions/                     # Server actions
│   └── services.ts              # Service CRUD operations
├── components/                  # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   ├── dashboard-sidebar.tsx    # Dashboard navigation
│   └── ...                      # Other components
├── lib/                         # Utility functions
│   ├── prisma.ts               # Prisma client configuration
│   ├── types/                  # TypeScript type definitions
│   └── utils.ts                # Helper functions
└── generated/                   # Generated Prisma client
    └── prisma/
```

## 🗄️ Database Schema

### Service Model
```prisma
model Service {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  price       Float
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mongodb-prisma-nextjs-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your MongoDB connection string:
   ```env
   DATABASE_URL="mongodb://localhost:27017/service-management"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Service Management

#### Creating a Service
1. Navigate to the Services page (`/dashboard/services`)
2. Click the "Add Service" button
3. Fill in the service details:
   - **Name**: Service name (required)
   - **Description**: Service description (required)
   - **Price**: Service price in USD (required)
   - **Active**: Toggle service availability
   - **Featured**: Mark service as featured
4. Click "Create Service"

#### Editing a Service
1. Find the service in the services table
2. Click the three-dot menu (⋮) in the Actions column
3. Select "Edit Service"
4. Modify the service details
5. Click "Update Service"

#### Deleting a Service
1. Find the service in the services table
2. Click the three-dot menu (⋮) in the Actions column
3. Select "Delete Service"
4. Confirm deletion in the dialog

#### Searching Services
- Use the search bar to find services by name or description
- Search is debounced (1.5 seconds) for optimal performance
- Search results update automatically as you type

#### Filtering Services
- Use the status dropdown to filter by:
  - **All**: Show all services
  - **Active**: Show only active services
  - **Inactive**: Show only inactive services

## 🔧 API Reference

### Server Actions

#### `getServices({ searchTerm, filterIsActive })`
Retrieves services with optional search and filtering.

**Parameters:**
- `searchTerm` (string, optional): Search query for name/description
- `filterIsActive` (FilterActive): Status filter object

**Returns:** Array of Service objects

#### `createService(formData)`
Creates a new service.

**Parameters:**
- `formData` (FormData): Service data from form

**Returns:** Redirects to services page or error object

#### `updateService(id, formData)`
Updates an existing service.

**Parameters:**
- `id` (string): Service ID
- `formData` (FormData): Updated service data

**Returns:** Redirects to services page or error object

#### `deleteService(id)`
Deletes a service.

**Parameters:**
- `id` (string): Service ID

**Returns:** Revalidates cache or error object

## 🎨 Component Architecture

### Server Components
- **Services Page**: Main page component that fetches data server-side
- **Service Table**: Displays services in a responsive table format

### Client Components
- **ServiceFilters**: Handles search and filtering with debounced input
- **ServiceForm**: Modal dialog for creating/editing services
- **ServiceActions**: Dropdown menu for service actions
- **DeleteServiceDialog**: Confirmation dialog for service deletion

### Key Design Patterns
- **Server/Client Separation**: Strategic use of server and client components
- **URL State Management**: Search and filter states in URL parameters
- **Optimistic Updates**: Immediate UI updates with server revalidation
- **Error Boundaries**: Proper error handling throughout the application

## 🚀 Performance Optimizations

### Search Optimization
- **Debounced Input**: 1.5-second delay prevents excessive API calls
- **Server-side Filtering**: Database-level filtering for better performance
- **Caching**: Prisma query caching with revalidation tags

### Rendering Optimization
- **Server Components**: Reduced client-side JavaScript bundle
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js automatic image optimization

### Database Optimization
- **Indexed Queries**: Proper database indexing for search operations
- **Connection Pooling**: Prisma connection pooling for database efficiency
- **Query Optimization**: Efficient Prisma queries with proper where clauses

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting (if configured)

## 🔒 Security Considerations

- **Input Validation**: Server-side validation for all inputs
- **Type Safety**: TypeScript prevents runtime type errors
- **SQL Injection Prevention**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

## 🚀 Deployment

### Environment Variables
```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="your-app-url"
```

### Build for Production
```bash
npm run build
npm run start
```

### Database Migration
```bash
npx prisma db push
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - The database toolkit
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy Coding! 🚀**