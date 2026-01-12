# Vibe

An AI-powered code generation and project management platform built with Next.js, Prisma, and Inngest.

## 🚀 Overview

Vibe is a modern web application that empowers developers to create, manage, and execute code projects with AI-assisted features. It combines real-time code execution, user authentication, and intelligent project organization into a seamless development experience.

## ✨ Features

- **AI-Powered Code Generation**: Generate and execute code snippets with AI assistance
- **Project Management**: Create and organize multiple projects with intuitive interfaces
- **Real-Time Code Execution**: Execute code in isolated sandboxes using E2B Code Interpreter
- **Message-Based Architecture**: Structured message system for tracking code generation and execution results
- **Code Fragments**: Save and manage code fragments with sandboxes and file tracking
- **Usage Tracking**: Monitor API usage with rate limiting and point-based system
- **User Authentication**: Secure authentication with Clerk
- **Dark/Light Theme Support**: Built-in theme switching with next-themes
- **Responsive UI**: Comprehensive component library with Radix UI and custom styling

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with Turbopack
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **RPC**: [tRPC](https://trpc.io/) - End-to-end typesafe APIs

### Backend
- **Runtime**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Job Processing**: [Inngest](https://www.inngest.com/) - Serverless event-driven workflows
- **Code Execution**: [E2B Code Interpreter](https://e2b.dev/) - Sandboxed code execution
- **Rate Limiting**: [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)

### Authentication
- **User Management**: [Clerk](https://clerk.com/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

### Development Tools
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Runtime**: [tsx](https://tsx.is/) for TypeScript execution

## 📁 Project Structure

```
vibe/
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma data models
│   ├── seed.ts            # Database seeding script
│   └── migrations/        # Migration history
├── src/
│   ├── app/               # Next.js app router
│   │   ├── (home)/        # Home page routes
│   │   ├── api/           # API routes and webhooks
│   │   ├── projects/      # Project-related pages
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── code-view/     # Code display component
│   ├── trpc/              # tRPC setup and routers
│   ├── inngest/           # Inngest functions and workflows
│   ├── lib/               # Utility functions and helpers
│   ├── modules/           # Feature modules (home, messages, projects, usage)
│   ├── hooks/             # Custom React hooks
│   ├── middleware.ts      # Next.js middleware
│   ├── types.ts           # TypeScript type definitions
│   └── prompt.ts          # AI prompt configurations
├── public/                # Static assets
├── sandbox-templates/     # E2B sandbox templates
└── package.json          # Project dependencies
```

## 📊 Database Schema

### User
- Stores user information linked to Clerk authentication
- Relationship with posts and projects

### Project
- Represents user projects with unique IDs and timestamps
- Contains multiple messages related to code generation
- Tracks project metadata

### Message
- Records AI interactions (user queries and assistant responses)
- Stores message content, role, and type
- Links to associated fragments
- Tracks creation and update timestamps

### Fragment
- Represents executable code fragments
- Contains sandbox URL for code execution
- Stores file structure in JSON format
- References parent message

### Usage
- Tracks API/feature usage with points
- Supports rate limiting and usage quotas
- Includes expiration dates for time-based limits

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL database
- Clerk account (for authentication)
- E2B account (for code execution)
- Inngest account (for job processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/vibe

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret

   # E2B Code Interpreter
   E2B_API_KEY=your_e2b_api_key

   # Inngest
   INNGEST_EVENT_KEY=your_inngest_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npm run seed  # Optional: populate with sample data
   ```

### Development

Start the development server with Turbopack:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build & Production

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

Run linting:
```bash
npm run lint
```

## 🔑 Key Components

### tRPC Routers
- End-to-end typesafe API calls between frontend and backend
- Automatic type inference for client-side queries and mutations
- Located in `src/trpc/routers/`

### Inngest Functions
- Serverless event-driven workflows
- Handle background jobs for code execution
- Defined in `src/inngest/functions.ts`

### Custom Hooks
- `use-current-themes`: Theme management
- `use-mobile`: Mobile detection
- `use-scroll`: Scroll position tracking

### UI Component Library
- Accordion, Alert Dialog, Avatar, Badge
- Button, Card, Carousel, Checkbox
- Command, Dialog, Drawer, Dropdown Menu
- File Explorer, Form, Input, Label
- Pagination, Popover, Progress, Radio Group
- Select, Sidebar, Skeleton, Slider
- Table, Tabs, Toggle, Tooltip
- And many more...

## 🔐 Authentication & Authorization

- **Clerk Integration**: Secure user authentication and session management
- **User Context**: Access authenticated user information throughout the app
- **Protected Routes**: API routes and pages can verify user authentication

## 💾 Database Management

### Migrations
```bash
# Create a new migration after schema changes
npx prisma migrate dev --name <migration_name>

# Reset the database (development only)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Prisma Studio
View and edit database records in a visual interface:
```bash
npx prisma studio
```

## 🎨 Theming

The application supports light and dark themes using `next-themes`:
- Theme preference is persisted in localStorage
- CSS variables for consistent styling
- Component-level theme awareness

## 📊 Monitoring & Usage Tracking

- **Usage Model**: Track feature usage with points-based system
- **Rate Limiting**: Prevent abuse with flexible rate limiting
- **Expiration**: Support time-based usage limits

## 🔄 API Integration

### tRPC Client Setup
```typescript
import { trpc } from '@/trpc/client'

// Use queries
const { data } = trpc.router.query.useQuery()

// Use mutations
const mutation = trpc.router.mutation.useMutation()
```

## 🚀 Deployment

The project is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Other Node.js hosting platforms**
- **Containerized deployments** (Docker support available)

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Clerk and E2B credentials set up
- [ ] Inngest webhook configured
- [ ] Build passes without errors

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL service is running
- Check network connectivity

### Authentication Issues
- Verify Clerk keys are correctly set
- Check CORS configuration
- Review Clerk dashboard for errors

### Code Execution Issues
- Verify E2B API key is valid
- Check sandbox template configuration
- Monitor Inngest jobs for failures

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [tRPC Documentation](https://trpc.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [E2B Documentation](https://e2b.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Please follow the established code style and submit pull requests for review.

---

## DEMO
 See demo preview below 
![Vibe Demo](./public/vibedemo.gif)



---
Feel free to reach out for any questions or support regarding the Vibe platform!