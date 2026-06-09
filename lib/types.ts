export interface Agent {
  id: string;
  name: string;
  type: 'trading-bot' | 'llm-instance' | 'oracle' | 'enterprise-ai';
  trustScore: number;
  status: 'active' | 'inactive' | 'suspended';
  onChainAddress?: string;
  createdAt: Date;
  lastScanned?: Date;
}

export interface ScanResult {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: Date;
  trustScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low' | 'safe';
  pillars: {
    onChainProvenance: {
      score: number;
      status: string;
      details: string;
    };
    modelAlignment: {
      score: number;
      status: string;
      details: string;
    };
    zkCompliance: {
      score: number;
      status: string;
      details: string;
    };
  };
  summary: string;
}

export interface ComplianceCredential {
  id: string;
  agentId: string;
  credentialType:
    | 'security-audit'
    | 'iso-certification'
    | 'eu-ai-act'
    | 'ongoing-monitoring';
  issuedBy: string;
  issuedDate: Date;
  expiryDate?: Date;
  status: 'active' | 'expired' | 'revoked';
  trustBoost: number;
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  createdAt: Date;
  votesFor: number;
  votesAgainst: number;
  deadline: Date;
}

export interface NetworkStats {
  activeScansPerSec: number;
  certifiedAgents: number;
  totalCredentialsIssued: number;
  agentsMonitored: number;
  securityIncidentsReported24h: number;
  protocolStatus: 'healthy' | 'degraded' | 'offline';
}
