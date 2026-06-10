'use client';

import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockAgents } from '@/lib/mock-data';

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = mockAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrustColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive:
        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      suspended:
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status] || colors.active;
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      'trading-bot': '🤖 Trading Bot',
      'llm-instance': '🧠 LLM Instance',
      oracle: '📊 Oracle',
      'enterprise-ai': '🏢 Enterprise AI',
    };
    return labels[type] || type;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agent Registry</h1>
        <p className="text-muted-foreground">
          Browse all verified agents in the SHAP ecosystem
        </p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <Card key={agent.id} className="hover:border-primary/50 transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(agent.status)}`}
                      >
                        {agent.status.charAt(0).toUpperCase() +
                          agent.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {getTypeBadge(agent.type)}
                    </p>
                    {agent.onChainAddress && (
                      <p className="text-xs text-muted-foreground font-mono mb-1">
                        Address: {agent.onChainAddress}
                      </p>
                    )}
                    {(agent as any).enterpriseId && (
                      <p className="text-xs text-muted-foreground font-mono mb-1">
                        Enterprise ID: {(agent as any).enterpriseId}
                      </p>
                    )}
                    {(agent as any).apiEndpoint && (
                      <p className="text-xs text-muted-foreground font-mono mb-1">
                        Endpoint: {(agent as any).apiEndpoint}
                      </p>
                    )}
                  </div>

                  {/* Right Side - Trust Score */}
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getTrustColor(agent.trustScore)}`}>
                      {agent.trustScore}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Trust Score
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last scanned:{' '}
                      {agent.lastScanned
                        ? new Date(agent.lastScanned).toLocaleDateString()
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                No agents found matching your search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAgents.length.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockAgents
                .filter((a) => a.status === 'active')
                .length.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Trust Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                mockAgents.reduce((a, b) => a + b.trustScore, 0) /
                  mockAgents.length
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
