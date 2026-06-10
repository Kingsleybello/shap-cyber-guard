'use client';

import React, { useEffect, useState } from 'react';
import { getAgents, scanAgent, deleteAgent } from '@/app/actions/agents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Play, Trash2, ArrowLeft } from 'lucide-react';

export default function MyAgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanningId] = useState<string | null>(null);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await getAgents();
        setAgents(data);
      } catch (error) {
        console.error('Failed to load agents:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAgents();
  }, []);

  const handleScan = async (agentId: string) => {
    setScanningId(agentId);
    try {
      await scanAgent(agentId);
      const data = await getAgents();
      setAgents(data);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setScanningId(null);
    }
  };

  const handleDelete = async (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(agentId);
        setAgents(agents.filter(a => a.id !== agentId));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">My Agents</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {agents.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground mb-4">No agents yet</p>
              <Link href="/register-agent">
                <Button>Register Agent</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <Link href={`/agent/${agent.id}`} className="flex-1 hover:opacity-80">
                      <div className="font-bold text-lg">{agent.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{agent.agentType}</div>
                      {agent.onChainAddress && (
                        <div className="text-xs text-muted-foreground font-mono mt-2">{agent.onChainAddress}</div>
                      )}
                      {agent.enterpriseId && (
                        <div className="text-xs text-muted-foreground font-mono mt-2">{agent.enterpriseId}</div>
                      )}
                    </Link>
                    <div className="flex gap-3 items-center">
                      <div className="text-right">
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {agent.status}
                        </Badge>
                        <div className="text-2xl font-bold mt-2">{parseFloat(agent.trustScore || 0).toFixed(1)}%</div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleScan(agent.id)}
                        disabled={scanning === agent.id}
                      >
                        <Play className="w-4 h-4" />
                        {scanning === agent.id ? 'Scanning...' : 'Scan'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
