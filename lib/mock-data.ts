import {
  Agent,
  ScanResult,
  ComplianceCredential,
  GovernanceProposal,
  NetworkStats,
} from './types';

export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'AlgoTrader Pro',
    type: 'trading-bot',
    trustScore: 92,
    status: 'active',
    onChainAddress: '0x742d35Cc6634C0532925a3b844Bc3e704Ed4D6b2',
    createdAt: new Date('2024-01-15'),
    lastScanned: new Date(),
  },
  {
    id: 'agent-002',
    name: 'DataOracle V3',
    type: 'oracle',
    trustScore: 87,
    status: 'active',
    onChainAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    createdAt: new Date('2024-02-20'),
    lastScanned: new Date(Date.now() - 3600000),
  },
  {
    id: 'agent-003',
    name: 'EnterpriseLLM-Cloud',
    type: 'llm-instance',
    trustScore: 78,
    status: 'active',
    enterpriseId: 'acme-2024-llm-001',
    apiEndpoint: 'https://api.acme.com/ai/v1/completions',
    createdAt: new Date('2024-03-10'),
    lastScanned: new Date(Date.now() - 7200000),
  },
  {
    id: 'agent-004',
    name: 'LiquidationBot X',
    type: 'trading-bot',
    trustScore: 65,
    status: 'inactive',
    onChainAddress: '0x1234567890abcdef1234567890abcdef12345678',
    createdAt: new Date('2024-01-05'),
    lastScanned: new Date(Date.now() - 86400000),
  },
  {
    id: 'agent-005',
    name: 'SecureAI Framework',
    type: 'enterprise-ai',
    trustScore: 95,
    status: 'active',
    enterpriseId: 'techcorp-ai-2024-secure-001',
    apiEndpoint: 'https://enterprise.techcorp.ai/api/inference',
    createdAt: new Date('2024-04-01'),
    lastScanned: new Date(Date.now() - 1800000),
  },
];

export const mockScanResults: Record<string, ScanResult> = {
  'agent-001': {
    id: 'scan-001',
    agentId: 'agent-001',
    agentName: 'AlgoTrader Pro',
    timestamp: new Date(),
    trustScore: 92,
    riskLevel: 'low',
    pillars: {
      onChainProvenance: {
        score: 94,
        status: 'Verified',
        details: 'Clean transaction history, 2+ years of activity',
      },
      modelAlignment: {
        score: 88,
        status: 'Compliant',
        details: 'Prompt injection resistant, behavioral safety passed',
      },
      zkCompliance: {
        score: 94,
        status: 'Certified',
        details: 'ISO 42001 & EU AI Act compliant',
      },
    },
    summary:
      'AlgoTrader Pro maintains high trust across all pillars. Strong on-chain history with consistent performance. Recommended for production use.',
  },
};

export const mockCredentials: ComplianceCredential[] = [
  {
    id: 'cred-001',
    agentId: 'agent-001',
    credentialType: 'security-audit',
    issuedBy: 'OpenZeppelin',
    issuedDate: new Date('2024-08-01'),
    expiryDate: new Date('2025-08-01'),
    status: 'active',
    trustBoost: 15,
  },
  {
    id: 'cred-002',
    agentId: 'agent-001',
    credentialType: 'iso-certification',
    issuedBy: 'Bureau Veritas',
    issuedDate: new Date('2024-06-15'),
    expiryDate: new Date('2025-06-15'),
    status: 'active',
    trustBoost: 12,
  },
  {
    id: 'cred-003',
    agentId: 'agent-005',
    credentialType: 'eu-ai-act',
    issuedBy: 'EU Compliance Authority',
    issuedDate: new Date('2024-07-10'),
    status: 'active',
    trustBoost: 20,
  },
  {
    id: 'cred-004',
    agentId: 'agent-002',
    credentialType: 'ongoing-monitoring',
    issuedBy: 'SHAP Protocol',
    issuedDate: new Date('2024-09-01'),
    status: 'active',
    trustBoost: 8,
  },
];

export const mockGovernanceProposals: GovernanceProposal[] = [
  {
    id: 'prop-001',
    title: 'Increase Trust Score Threshold',
    description: 'Propose raising minimum trust score for agents from 60 to 70',
    status: 'active',
    createdAt: new Date(Date.now() - 172800000),
    votesFor: 1243,
    votesAgainst: 312,
    deadline: new Date(Date.now() + 259200000),
  },
  {
    id: 'prop-002',
    title: 'Add ISO 27001 Certification',
    description:
      'Add ISO 27001 Information Security Management as a credential type',
    status: 'passed',
    createdAt: new Date(Date.now() - 604800000),
    votesFor: 2156,
    votesAgainst: 234,
    deadline: new Date(Date.now() - 172800000),
  },
  {
    id: 'prop-003',
    title: 'Quarterly Compliance Review',
    description: 'Mandate quarterly security reviews for all certified agents',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000),
    votesFor: 0,
    votesAgainst: 0,
    deadline: new Date(Date.now() + 432000000),
  },
];

export const mockNetworkStats: NetworkStats = {
  activeScansPerSec: 2847,
  certifiedAgents: 4287,
  totalCredentialsIssued: 6432,
  agentsMonitored: 12847,
  securityIncidentsReported24h: 2,
  protocolStatus: 'healthy',
};

export const mockAuditEvents = [
  {
    id: 'audit-001',
    agentId: 'agent-001',
    eventType: 'credential-issued' as const,
    severity: 'info' as const,
    description: 'Security audit credential issued by OpenZeppelin',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'audit-002',
    agentId: 'agent-001',
    eventType: 'scan-completed' as const,
    severity: 'info' as const,
    description: 'Routine security scan completed - all checks passed',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 'audit-003',
    agentId: 'agent-005',
    eventType: 'compliance-verified' as const,
    severity: 'info' as const,
    description: 'EU AI Act compliance verified and certified',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 'audit-004',
    agentId: 'agent-004',
    eventType: 'trust-score-updated' as const,
    severity: 'warning' as const,
    description: 'Trust score decreased due to inactivity',
    timestamp: new Date(Date.now() - 172800000),
  },
  {
    id: 'audit-005',
    agentId: 'agent-002',
    eventType: 'scan-completed' as const,
    severity: 'info' as const,
    description: 'Routine security scan completed - minor recommendations',
    timestamp: new Date(Date.now() - 259200000),
  },
];
