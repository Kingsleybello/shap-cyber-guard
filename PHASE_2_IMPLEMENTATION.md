# Phase 2: User Authentication & Agent Management

## Overview

Phase 2 transforms SHAP Cyber Guard from a public information hub into a production-grade SaaS platform with user accounts, persistent data storage, and advanced agent management capabilities.

## What Was Built

### Authentication System
- **Better Auth** with email/password authentication
- User registration and login flows
- Session management with 7-day expiration
- Secure password hashing and storage
- Cross-site session cookies for development environments

### Database Schema (Neon PostgreSQL)

**Better Auth Tables:**
- `user` - User accounts with email, name, profile image
- `session` - User sessions with expiration tracking
- `account` - Account linkage (for future OAuth support)
- `verification` - Email verification tokens

**SHAP Application Tables:**
- `agents` - User-registered AI agents with type-specific fields
  - Supports 4 agent types: Trading Bot, Oracle, LLM Instance, Enterprise AI
  - Web3 agents store on-chain addresses
  - Enterprise agents store enterprise IDs and API endpoints
- `scans` - Historical scan results for agents
  - Trust scores with three-pillar breakdown (On-chain Provenance, Model Alignment, ZK Compliance)
- `watchlist` - User's monitored agents
- `compliance_events` - Audit trail of compliance updates and security incidents
- `notifications` - Real-time alerts for users

### Pages Implemented

1. **Sign-Up** (`/sign-up`) - Create new account with name, email, password
2. **Sign-In** (`/sign-in`) - Login with email and password
3. **Dashboard** (`/dashboard`) - Overview KPIs and quick stats
4. **Register Agent** (`/register-agent`) - Form to add new agents
5. **My Agents** (`/my-agents`) - List and manage user's agents
6. **Agent Detail** (`/agent/[id]`) - Detailed view with scan history and compliance

### Server Actions (Protected Routes)

All database operations secured with `getUserId()` pattern:
- `addAgent()` - Register new agent
- `getAgents()` - Fetch user's agents
- `scanAgent()` - Execute agent scan
- `addToWatchlist()` - Monitor agent
- `removeFromWatchlist()` - Stop monitoring
- `getScanHistory()` - Agent scan timeline
- `createNotification()` - Add alert

### Authentication Flow

```
1. User signs up at /sign-up
   → Password hashed with bcrypt
   → User created in Neon DB
   → Session token issued via cookie

2. User authenticated requests
   → Browser sends session cookie
   → Session validated by Better Auth
   → User ID extracted for data scoping
   → All queries filtered by userId

3. User redirected to /dashboard
   → Server component fetches user's agents
   → Personal portfolio displayed
```

## Architecture Decisions

### User Data Scoping
- No Row Level Security (RLS) on Neon
- Every query explicitly filters by `userId`
- `getUserId()` helper validates session and prevents unauthorized access
- Pattern: `db.select().from(agents).where(eq(agents.userId, userId))`

### Database Connection
- Single `pg` Pool shared by Better Auth and Drizzle
- Better Auth manages user/session tables
- App uses same pool for efficiency
- Connection string from Neon integration via `DATABASE_URL`

### Authentication Secret
- `BETTER_AUTH_SECRET` required and must be set before deployment
- Used for signing session tokens and encrypting sensitive data
- Generate with: `openssl rand -base64 32`

## Environment Variables Required

```
DATABASE_URL=postgresql://user:password@host/dbname
BETTER_AUTH_SECRET=<32-char-base64-string>
BETTER_AUTH_URL=<optional-custom-domain>
```

## How to Deploy

### On Vercel
1. Connect Neon integration to Vercel project
2. Set `BETTER_AUTH_SECRET` in environment variables
3. Deploy via git push or `vercel deploy`
4. Database migrations run automatically
5. Auth endpoints live at `/api/auth/*`

### Development (Local)

For local development with DATABASE_URL available:
```bash
export DATABASE_URL=postgresql://...
export BETTER_AUTH_SECRET=$(openssl rand -base64 32)
pnpm dev
```

The Better Auth baseURL will use environment variables to determine the correct URL for callbacks.

## Code Organization

```
lib/
  auth.ts                    # Better Auth server config
  auth-client.ts             # React client for auth
  db/
    index.ts                 # Drizzle + pg Pool
    schema.ts                # All table definitions
app/
  api/auth/[...all]/route.ts # Better Auth HTTP handler
  sign-in/page.tsx           # Login page
  sign-up/page.tsx           # Registration page
  dashboard/page.tsx         # User dashboard
  register-agent/page.tsx    # Add agent form
  my-agents/page.tsx         # Agent list
  agent/[id]/page.tsx        # Agent details
  actions/agents.ts          # Server actions
```

## Testing Auth Flow

1. Visit `http://localhost:3000/sign-up`
2. Enter: name, email, password (min 8 chars)
3. Click "Create account"
4. Should redirect to `/dashboard` on success
5. Session cookie stores authentication

## Next Steps (Phase 3)

- Historical charts and analytics
- Real blockchain verification for Web3 agents
- Compliance event tracking and reporting
- Advanced watchlist with threshold alerts
- Export reports as PDF
- Team management and role-based access

## Common Issues

**"Invalid" error on signup:**
- Check `DATABASE_URL` is set and points to Neon
- Verify `BETTER_AUTH_SECRET` is set
- Check network connection to Neon

**Session not persisting:**
- Ensure cookies are enabled in browser
- In development, sameSite cookie set to "none" for iframe access
- Check browser's developer tools → Application → Cookies

**500 errors on auth endpoints:**
- Check server logs for database connection errors
- Verify Neon connection string format
- Ensure schema exists (tables created via Neon MCP)

---

Phase 2 is production-ready and fully type-safe with TypeScript. All user data is properly protected through session-based authentication and per-user query scoping.
