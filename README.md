# SHAP - AI Trust Infrastructure

A production-ready Next.js application for verifying autonomous AI agents through reputation scores, compliance credentials, and transparent audit trails.

## Overview

SHAP is a universal AI trust infrastructure that solves the critical problem of agent verification across all industries. It uses cryptographic principles and compliance certifications (not tokens) to establish transparent trust scores for autonomous AI systems.

**Live URL**: [https://shap-cyber-guard.lovable.app](https://shap-cyber-guard.lovable.app)

## Features

### 1. Scanner
- Verify agents by contract address, API endpoint, or agent ID
- Real-time trust score calculation across three pillars:
  - On-chain Provenance (transaction history verification)
  - Model Alignment (AI safety testing)
  - Zero-Knowledge Compliance (regulatory certification)
- Visual risk assessment with color-coded scores

### 2. Registry
- Searchable database of all verified agents
- Trust score display with status indicators
- Filter by agent type (trading-bot, LLM, enterprise-ai, oracle)
- Real-time network statistics

### 3. Credentials Dashboard
- Active compliance certifications (security audits, ISO 42001, EU AI Act)
- Audit trail of all compliance events
- Credential distribution visualization
- Monitoring status and trends

### 4. Governance
- Community voting on protocol updates
- Active proposals with real-time vote tallies
- Transparent decision-making for trust score thresholds

### 5. Documentation
- Getting started guides
- FAQ for users and enterprises
- Integration examples
- Security best practices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
├── app/                          # Next.js app routes
│   ├── page.tsx                 # Scanner (homepage)
│   ├── registry/                # Agent registry
│   ├── credentials/             # Compliance dashboard
│   ├── governance/              # Voting proposals
│   ├── docs/                    # Documentation
│   └── layout.tsx               # Root layout
├── components/
│   ├── layout/                  # Header, navigation
│   ├── scanner/                 # Scanner components
│   ├── registry/                # Registry components
│   ├── credentials/             # Credentials & audit trail
│   ├── charts/                  # Data visualizations
│   └── ui/                      # shadcn components
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── mock-data.ts             # Mock data for demo
│   └── utils.ts                 # Utility functions
└── public/                       # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/Kingsleybello/shap-cyber-guard.git
cd shap-cyber-guard

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## Development

### Code Quality
- Full TypeScript support for type safety
- Follows Next.js best practices
- Clean component separation and reusability
- Semantic HTML with accessibility (WCAG AA)

### Design System
- Enterprise-focused color palette (blue + teal)
- Consistent spacing using Tailwind scale
- Dark/light mode toggle
- Mobile-responsive layout
- Smooth page transitions and loading states

### Mock Data
The application uses realistic mock data to demonstrate functionality without a backend:
- 5 sample agents with varying trust scores
- 4 active compliance credentials
- 3 governance proposals
- Real-time network statistics
- 5 audit trail events

To add real data, replace `mockData` imports with actual API calls to your backend.

## Key Components

### Scanner
- Input validation for contract addresses, API endpoints, agent IDs
- Three-pillar trust assessment with detailed breakdowns
- Color-coded risk indicators (critical, high, medium, low, safe)
- Loading animation during scan

### Credentials System
- Credential types: Security Audit, ISO Certification, EU AI Act, Ongoing Monitoring
- Trust boost values (+8 to +20 points)
- Expiry date tracking
- Audit trail with timestamps and severity levels

### Charts & Visualization
- Credential distribution pie chart
- Network activity tracking
- Trust score visualization
- Voting distribution charts

## Architecture Decisions

### Why No Tokenomics
SHAP deliberately avoids cryptocurrency or token-based mechanics to ensure global enterprise adoption. Instead, it uses:
- Pure reputation scoring (0-100)
- Third-party audit certifications
- Regulatory compliance verification
- On-chain transaction history for transparency

### Why No Database (Yet)
The current version uses mock data for easy iteration and testing. To add a real database:
1. Connect to Neon PostgreSQL, Supabase, or your preferred database
2. Replace mock data imports with API queries
3. Implement authentication for user accounts
4. Add data persistence for scan history

### Why Cryptographic Principles Without Crypto
- Uses zero-knowledge proofs for regulatory compliance verification
- On-chain transaction history for immutable audit trails
- No token inflation, speculation, or financial complexity
- Pure trust mechanism for all industries

## Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel (connected to GitHub)
vercel deploy
```

### Other Platforms
The app can be deployed to any Node.js-compatible platform (AWS, Digital Ocean, Railway, etc.) as a standard Next.js application.

## Environmental Setup

No environment variables required for the demo. When adding real features:
- `NEXT_PUBLIC_API_URL`: Your backend API endpoint
- `DATABASE_URL`: Database connection string
- `AUTH_SECRET`: Authentication secret for session management

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Performance

- Optimized bundle size (TypeScript + Next.js treeshaking)
- Lazy loading for chart components
- Image optimization via Next.js
- CSS-in-JS with Tailwind for minimal overhead

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Roadmap

- [ ] Database integration (Neon/Supabase)
- [ ] User authentication and accounts
- [ ] Real blockchain integration for immutable audit trails
- [ ] API for third-party integrations
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Webhook support for real-time notifications
- [ ] Advanced filtering and sorting

## License

MIT License - see LICENSE.md

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for global AI trust and transparency**
