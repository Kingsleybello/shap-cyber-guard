'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { registerAgent } from '@/app/actions/agents';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterAgentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    agentType: 'trading-bot',
    onChainAddress: '',
    enterpriseId: '',
    apiEndpoint: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerAgent({
        name: formData.name,
        agentType: formData.agentType,
        onChainAddress: formData.agentType.includes('trading') || formData.agentType === 'oracle' ? formData.onChainAddress : undefined,
        enterpriseId: formData.agentType.includes('enterprise') || formData.agentType === 'llm-instance' ? formData.enterpriseId : undefined,
        apiEndpoint: formData.agentType === 'llm-instance' || formData.agentType === 'enterprise-ai' ? formData.apiEndpoint : undefined,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to register agent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Register New Agent</h1>
          <p className="text-muted-foreground mt-2">Add an AI agent to your portfolio</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Agent Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agent Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Agent Name *</label>
                <Input
                  type="text"
                  placeholder="e.g., AlgoTrader Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Agent Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Agent Type *</label>
                <select
                  value={formData.agentType}
                  onChange={(e) => setFormData({ ...formData, agentType: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="trading-bot">Trading Bot</option>
                  <option value="oracle">Oracle</option>
                  <option value="llm-instance">LLM Instance</option>
                  <option value="enterprise-ai">Enterprise AI</option>
                </select>
              </div>

              {/* Web3 Address (for trading bots and oracles) */}
              {(formData.agentType === 'trading-bot' || formData.agentType === 'oracle') && (
                <div>
                  <label className="block text-sm font-medium mb-2">On-Chain Address</label>
                  <Input
                    type="text"
                    placeholder="0x..."
                    value={formData.onChainAddress}
                    onChange={(e) => setFormData({ ...formData, onChainAddress: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Ethereum address for on-chain verification</p>
                </div>
              )}

              {/* Enterprise ID */}
              {(formData.agentType === 'enterprise-ai' || formData.agentType === 'llm-instance') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Enterprise ID</label>
                  <Input
                    type="text"
                    placeholder="e.g., acme-2024-llm-001"
                    value={formData.enterpriseId}
                    onChange={(e) => setFormData({ ...formData, enterpriseId: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Internal enterprise identifier</p>
                </div>
              )}

              {/* API Endpoint */}
              {(formData.agentType === 'llm-instance' || formData.agentType === 'enterprise-ai') && (
                <div>
                  <label className="block text-sm font-medium mb-2">API Endpoint</label>
                  <Input
                    type="url"
                    placeholder="https://api.example.com/ai/v1"
                    value={formData.apiEndpoint}
                    onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">API endpoint for verification</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">Cancel</Button>
                </Link>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Registering...' : 'Register Agent'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
