'use client';

import React, { useState } from 'react';
import { Award, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCredentials, mockNetworkStats } from '@/lib/mock-data';

export default function CredentialsPage() {
  const getCredentialColor = (type: string) => {
    const colors: Record<string, string> = {
      'security-audit': 'bg-blue-100 text-blue-800 dark:bg-blue-900',
      'iso-certification':
        'bg-purple-100 text-purple-800 dark:bg-purple-900',
      'eu-ai-act': 'bg-green-100 text-green-800 dark:bg-green-900',
      'ongoing-monitoring':
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900',
    };
    return colors[type] || colors['security-audit'];
  };

  const getCredentialLabel = (type: string) => {
    const labels: Record<string, string> = {
      'security-audit': 'Security Audit',
      'iso-certification': 'ISO Certification',
      'eu-ai-act': 'EU AI Act Compliant',
      'ongoing-monitoring': 'Ongoing Monitoring',
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900',
      expired: 'bg-red-100 text-red-800 dark:bg-red-900',
      revoked: 'bg-gray-100 text-gray-800 dark:bg-gray-900',
    };
    return colors[status] || colors.active;
  };

  const activeCredentials = mockCredentials.filter(
    (c) => c.status === 'active'
  ).length;
  const expiredCredentials = mockCredentials.filter(
    (c) => c.status === 'expired'
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compliance & Credentials</h1>
        <p className="text-muted-foreground">
          Audit certifications and compliance credentials for all agents
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              {mockCredentials.length}
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
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {activeCredentials}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expired
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              {expiredCredentials}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Agents Monitored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNetworkStats.agentsMonitored.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credentials Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Active Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Issued By
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Issued Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Expiry Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Trust Boost
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCredentials.map((credential) => (
                  <tr key={credential.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <Badge className={getCredentialColor(credential.credentialType)}>
                        {getCredentialLabel(credential.credentialType)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {credential.issuedBy}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(credential.issuedDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {credential.expiryDate
                        ? new Date(credential.expiryDate).toLocaleDateString()
                        : 'No expiry'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusBadge(credential.status)}>
                        {credential.status.charAt(0).toUpperCase() +
                          credential.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      +{credential.trustBoost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Credential Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>By Credential Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'security-audit',
                'iso-certification',
                'eu-ai-act',
                'ongoing-monitoring',
              ].map((type) => {
                const count = mockCredentials.filter(
                  (c) => c.credentialType === type
                ).length;
                const percentage = Math.round(
                  (count / mockCredentials.length) * 100
                );
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">
                        {getCredentialLabel(type)}
                      </label>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monitoring Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Healthy</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All agents with credentials are being actively monitored
                    for compliance violations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Trending Up</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    32% increase in ISO 42001 certifications this quarter.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
