import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Redirect authenticated users to dashboard
  if (session?.user) {
    redirect('/dashboard');
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            SHAP Cyber Guard
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Enterprise-grade AI trust infrastructure. Verify, monitor, and manage autonomous agents with cryptographic reputation and compliance credentials.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-lg p-6 border">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-bold mb-2">Cryptographic Reputation</h3>
            <p className="text-muted-foreground">
              On-chain verification and zero-knowledge compliance proofs for trustless agent validation.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold mb-2">Real-time Monitoring</h3>
            <p className="text-muted-foreground">
              Continuous security scanning and compliance tracking across your agent portfolio.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold mb-2">Enterprise Compliance</h3>
            <p className="text-muted-foreground">
              ISO 42001, EU AI Act, and SOC 2 compliance certifications for your autonomous systems.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card border rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to manage your AI agents?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sign up today to register your first autonomous agent and get started with trust-based AI governance.
          </p>
          <Link href="/sign-up">
            <Button size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
