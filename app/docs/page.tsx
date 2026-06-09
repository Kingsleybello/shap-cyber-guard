'use client';

import React from 'react';
import { Book, Code2, MessageSquare, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to integrate with SHAP and understand the protocol
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <Code2 className="w-5 h-5 mb-2 text-accent" />
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to submit your agent for scanning and get started with
              SHAP.
            </p>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="w-5 h-5 mb-2 text-primary" />
            <CardTitle>Security Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Understand how SHAP evaluates agents across three security pillars.
            </p>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Book className="w-5 h-5 mb-2 text-green-600" />
            <CardTitle>Compliance & Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn about the certification programs and compliance standards
              supported by SHAP.
            </p>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="w-5 h-5 mb-2 text-yellow-600" />
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access the complete SHAP API documentation for programmatic
              integration.
            </p>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Documentation */}
      <div className="space-y-8">
        {/* Section 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              What is SHAP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              SHAP is a universal AI trust infrastructure designed to verify
              autonomous agents across all industries. We solve a critical
              problem: <strong>How do you know if an AI system is trustworthy?</strong>
            </p>
            <p>
              Using cryptographic principles, security audits, and compliance
              certifications, SHAP provides a single trust score that enterprises,
              regulators, and developers can rely on.
            </p>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              The Three Security Pillars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">1. On-Chain Provenance</h4>
              <p className="text-muted-foreground">
                We verify the blockchain transaction history of agents,
                checking for suspicious patterns, fund flows, and behavioral
                consistency over time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Model Alignment</h4>
              <p className="text-muted-foreground">
                We test AI systems for prompt injection vulnerabilities,
                adversarial robustness, and behavioral safety to ensure they
                operate as intended.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. ZK Compliance</h4>
              <p className="text-muted-foreground">
                We verify compliance with ISO 42001, EU AI Act, and other
                regulatory frameworks using zero-knowledge proofs for privacy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Compliance Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Agents can earn credentials by passing security audits and
              certifications from trusted third parties:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Security Audits:</strong> Third-party code reviews by firms like OpenZeppelin</li>
              <li><strong>ISO 42001:</strong> AI Management System certification</li>
              <li><strong>EU AI Act:</strong> EU regulatory compliance verification</li>
              <li><strong>Ongoing Monitoring:</strong> Real-time compliance tracking</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              How to Get Your Agent Certified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Submit your agent for initial scanning on SHAP</li>
              <li>Receive a preliminary trust score and assessment</li>
              <li>Address any identified vulnerabilities</li>
              <li>Arrange for third-party security audits</li>
              <li>Apply for relevant compliance certifications</li>
              <li>Achieve certified status with boost to trust score</li>
            </ol>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">For Traders</h4>
              <p className="text-muted-foreground">
                Verify trading bots before risking capital. Check trust scores,
                security history, and compliance status.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Enterprises</h4>
              <p className="text-muted-foreground">
                Vet third-party AI systems before integration. Ensure compliance
                with internal security policies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Regulators</h4>
              <p className="text-muted-foreground">
                Monitor AI systems for compliance violations and enforce
                standards across ecosystems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Developers</h4>
              <p className="text-muted-foreground">
                Build trust in your AI system. Earn credentials and improve
                reputation through SHAP certification.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Is SHAP a crypto platform?</h4>
              <p className="text-muted-foreground">
                No. SHAP uses cryptographic principles for transparency and
                security, but it&apos;s designed for all industries—not just crypto.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">What does the trust score mean?</h4>
              <p className="text-muted-foreground">
                A trust score from 0-100 indicates how likely an agent is to
                operate safely and compliantly. Scores are based on the three
                security pillars.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">How much does certification cost?</h4>
              <p className="text-muted-foreground">
                Certification costs vary by credential type and third-party
                auditor. Contact us for specific pricing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">How often are agents re-scanned?</h4>
              <p className="text-muted-foreground">
                Certified agents are monitored continuously. Rescans are
                performed quarterly or upon significant updates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
