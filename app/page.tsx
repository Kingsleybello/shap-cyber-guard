'use client';

import React, { useState } from 'react';
import {
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockNetworkStats, mockAgents, mockScanResults } from '@/lib/mock-data';
import { ScanResult } from '@/lib/types';
import { TrustScoreChart } from '@/components/charts/ChartComponents';
import { LoadingSpinner, PageTransition } from '@/components/ui/loading';

const presets = [
  { label: 'Web3 Trading Bot', icon: '🤖' },
  { label: 'LLM Instance', icon: '🧠' },
  { label: 'Enterprise AI', icon: '🏢' },
];

export default function ScannerPage() {
  const [scanInput, setScanInput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Simulate scan result
    setScanResult(mockScanResults['agent-001']);
    setIsLoading(false);
  };

  const getRiskColor = (riskLevel: string) => {
    const colors: Record<string, string> = {
      critical: 'text-destructive bg-destructive/10',
      high: 'text-red-600 bg-red-50 dark:bg-red-950',
      medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
      low: 'text-green-600 bg-green-50 dark:bg-green-950',
      safe: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950',
    };
    return colors[riskLevel] || colors.medium;
  };

  const getTrustColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <PageTransition>
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SHAP Cyber Guard
              </h1>
              <p className="text-muted-foreground mt-1">Global AI Trust Infrastructure</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Verify autonomous agents with cryptographic reputation, compliance credentials, and real-time security monitoring.
          </p>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Scans/sec
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              {mockNetworkStats.activeScansPerSec.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Certified Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              {mockNetworkStats.certifiedAgents.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Security Incidents (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              {mockNetworkStats.securityIncidentsReported24h}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Protocol Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
              Healthy
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanner Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verify an Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter contract address, API endpoint, or agent ID..."
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleScan}
              disabled={!scanInput && !selectedPreset || isLoading}
              className="px-8"
            >
              {isLoading ? 'Scanning...' : 'Scan'}
            </Button>
          </div>

          {/* Presets */}
          <div>
            <p className="text-sm font-medium mb-3">Quick Presets:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant={
                    selectedPreset === preset.label ? 'default' : 'outline'
                  }
                  className="justify-start"
                  onClick={() => {
                    setSelectedPreset(preset.label);
                    setScanInput(preset.label);
                  }}
                >
                  <span className="mr-2">{preset.icon}</span>
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Result */}
      {scanResult && (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{scanResult.agentName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scanned at {new Date(scanResult.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-4xl font-bold ${getTrustColor(scanResult.trustScore)}`}
                  >
                    {scanResult.trustScore}
                  </div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Level */}
              <div>
                <p className="text-sm font-medium mb-2">Risk Level</p>
                <div
                  className={`inline-block px-3 py-1 rounded-full ${getRiskColor(scanResult.riskLevel)}`}
                >
                  <span className="font-medium capitalize">
                    {scanResult.riskLevel}
                  </span>
                </div>
              </div>

              {/* Three Pillars */}
              <div>
                <p className="text-sm font-medium mb-3">Security Assessment</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(scanResult.pillars).map(([key, pillar]) => (
                    <div
                      key={key}
                      className="border rounded-lg p-4 bg-card/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div
                          className={`text-xl font-bold ${getTrustColor(pillar.score)}`}
                        >
                          {pillar.score}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Status: {pillar.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pillar.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Score Chart */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-medium mb-4">Trust Score Visualization</h4>
                <TrustScoreChart score={scanResult.trustScore} />
              </div>

              {/* Summary */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-medium">Summary: </span>
                  {scanResult.summary}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </PageTransition>
    </div>
  );
}
