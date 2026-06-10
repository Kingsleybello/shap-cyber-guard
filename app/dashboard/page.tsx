'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Plus, BarChart3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAgents, getNotifications } from '@/app/actions/agents';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [agentsData, notificationsData] = await Promise.all([
          getAgents(),
          getNotifications(),
        ]);
        setAgents(agentsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const avgTrustScore = agents.length > 0 
    ? (agents.reduce((sum, a) => sum + parseFloat(a.trustScore || 0), 0) / agents.length).toFixed(2)
    : '0';

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const criticalAlerts = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back to SHAP</p>
          </div>
          <div className="flex gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition">
              <Bell className="w-6 h-6" />
              {criticalAlerts > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {criticalAlerts}
                </span>
              )}
            </button>
            <Link href="/register-agent">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Agent
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Total Agents</div>
              <div className="text-3xl font-bold mt-2">{agents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Active</div>
              <div className="text-3xl font-bold mt-2 text-green-600">{activeAgents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Avg Trust Score</div>
              <div className="text-3xl font-bold mt-2">{avgTrustScore}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Alerts</div>
              <div className={`text-3xl font-bold mt-2 ${criticalAlerts > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                {criticalAlerts}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Agents Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Agents</CardTitle>
              <Link href="/my-agents">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {agents.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No agents registered yet</p>
                <Link href="/register-agent">
                  <Button>Register Your First Agent</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {agents.slice(0, 5).map((agent) => (
                  <Link key={agent.id} href={`/agent/${agent.id}`}>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition cursor-pointer">
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {agent.agentType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {agent.status}
                        </Badge>
                        <div className="text-right">
                          <div className="font-bold text-lg">{parseFloat(agent.trustScore || 0).toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notif) => (
                  <div key={notif.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">{notif.title}</div>
                      <div className="text-sm text-muted-foreground">{notif.message}</div>
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
