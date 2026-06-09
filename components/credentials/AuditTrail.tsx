'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Info, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AuditEvent {
  id: string;
  agentId: string;
  eventType: 'credential-issued' | 'scan-completed' | 'compliance-verified' | 'trust-score-updated' | 'slashing-incident';
  severity: 'info' | 'warning' | 'critical';
  description: string;
  timestamp: Date;
}

interface AuditTrailProps {
  events: AuditEvent[];
  title?: string;
}

export function AuditTrail({ events, title = 'Recent Activity' }: AuditTrailProps) {
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'credential-issued':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'scan-completed':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'compliance-verified':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'trust-score-updated':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'slashing-incident':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, any> = {
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return variants[severity] || variants.info;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events recorded</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0"
              >
                <div className="mt-1">{getEventIcon(event.eventType)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium">{event.description}</p>
                    <Badge className={getSeverityBadge(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(event.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
