'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockGovernanceProposals } from '@/lib/mock-data';
import { VotingChart } from '@/components/charts/ChartComponents';

export default function GovernancePage() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-blue-100 text-blue-800 dark:bg-blue-900',
      passed: 'bg-green-100 text-green-800 dark:bg-green-900',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900',
    };
    return colors[status] || colors.active;
  };

  const getProposalIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-5 h-5" />;
      case 'passed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Governance</h1>
        <p className="text-muted-foreground">
          Community-driven protocol decisions and proposals
        </p>
      </div>

      {/* Proposal List */}
      <div className="space-y-4">
        {mockGovernanceProposals.map((proposal) => {
          const totalVotes = proposal.votesFor + proposal.votesAgainst;
          const forPercentage =
            totalVotes > 0
              ? Math.round((proposal.votesFor / totalVotes) * 100)
              : 0;

          return (
            <Card key={proposal.id} className="hover:border-primary/50 transition">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {proposal.title}
                        </h3>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status.charAt(0).toUpperCase() +
                            proposal.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {proposal.description}
                      </p>
                    </div>
                    {getProposalIcon(proposal.status)}
                  </div>

                  {/* Voting Info */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Votes: {totalVotes.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {forPercentage}% in favor
                        </span>
                      </div>
                      <VotingChart votesFor={proposal.votesFor} votesAgainst={proposal.votesAgainst} />
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span>
                          {proposal.votesFor.toLocaleString()} For
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        <span>
                          {proposal.votesAgainst.toLocaleString()} Against
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      Created{' '}
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-muted-foreground">
                      {proposal.status === 'active'
                        ? `Deadline: ${new Date(proposal.deadline).toLocaleDateString()}`
                        : `Ended: ${new Date(proposal.deadline).toLocaleDateString()}`}
                    </div>
                  </div>

                  {/* Actions */}
                  {proposal.status === 'active' && (
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGovernanceProposals.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Passed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {
                mockGovernanceProposals.filter((p) => p.status === 'passed')
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Voting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {
                mockGovernanceProposals.filter((p) => p.status === 'active')
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
