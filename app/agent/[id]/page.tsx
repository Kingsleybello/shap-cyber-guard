'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAgent, getAgentScans, getComplianceEvents } from '@/app/actions/agents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, LineChart as LineChartIcon } from 'lucide-react';

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;
  const [agent, setAgent] = useState<any>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [agentData, scansData, eventsData] = await Promise.all([
          getAgent(agentId),
          getAgentScans(agentId),
          getComplianceEvents(agentId),
        ]);
        setAgent(agentData);
        setScans(scansData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to load agent details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [agentId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!agent) return <div className="min-h-screen flex items-center justify-center">Agent not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/my-agents" className="flex items-center gap-2 text-primary mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground mt-1">{agent.agentType}</p>
            </div>
            <div className="text-right">
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
              <div className="text-3xl font-bold mt-4">{parseFloat(agent.trustScore || 0).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agent.onChainAddress && (
              <div>
                <div className="text-sm text-muted-foreground">On-Chain Address</div>
                <div className="font-mono text-sm mt-1">{agent.onChainAddress}</div>
              </div>
            )}
            {agent.enterpriseId && (
              <div>
                <div className="text-sm text-muted-foreground">Enterprise ID</div>
                <div className="font-mono text-sm mt-1">{agent.enterpriseId}</div>
              </div>
            )}
            {agent.apiEndpoint && (
              <div>
                <div className="text-sm text-muted-foreground">API Endpoint</div>
                <div className="font-mono text-sm mt-1">{agent.apiEndpoint}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">Created</div>
              <div className="text-sm mt-1">{new Date(agent.createdAt).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
          </CardHeader>
          <CardContent>
            {scans.length === 0 ? (
              <p className="text-muted-foreground">No scans yet</p>
            ) : (
              <div className="space-y-2">
                {scans.map((scan) => (
                  <div key={scan.id} className="flex justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">{parseFloat(scan.trustScore).toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div>OCP: {parseFloat(scan.onChainProvenance || 0).toFixed(1)}%</div>
                      <div>MA: {parseFloat(scan.modelAlignment || 0).toFixed(1)}%</div>
                      <div>ZK: {parseFloat(scan.zkCompliance || 0).toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compliance Events */}
        {events.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Compliance Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events.map((event) => (
                  <div key={event.id} className="flex justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{event.description}</div>
                      <Badge className="mt-1" variant={event.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {event.severity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
