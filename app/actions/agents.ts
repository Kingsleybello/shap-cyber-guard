'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { agents, scans, watchlist, complianceEvents, notifications } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error('Unauthorized');
  return session.user.id;
}

export async function registerAgent(data: {
  name: string;
  agentType: string;
  onChainAddress?: string;
  enterpriseId?: string;
  apiEndpoint?: string;
}) {
  const userId = await getUserId();
  const id = `agent-${Date.now()}`;

  await db.insert(agents).values({
    id,
    userId,
    name: data.name,
    agentType: data.agentType,
    onChainAddress: data.onChainAddress,
    enterpriseId: data.enterpriseId,
    apiEndpoint: data.apiEndpoint,
    status: 'active',
    trustScore: '0',
  });

  revalidatePath('/dashboard');
  return { id, success: true };
}

export async function getAgents() {
  const userId = await getUserId();
  return db
    .select()
    .from(agents)
    .where(eq(agents.userId, userId))
    .orderBy(desc(agents.createdAt));
}

export async function getAgent(agentId: string) {
  const userId = await getUserId();
  const [agent] = await db
    .select()
    .from(agents)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));
  return agent;
}

export async function updateAgent(agentId: string, data: { name?: string; status?: string }) {
  const userId = await getUserId();
  await db
    .update(agents)
    .set(data)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));

  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteAgent(agentId: string) {
  const userId = await getUserId();
  await db
    .delete(agents)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));

  revalidatePath('/dashboard');
  return { success: true };
}

export async function scanAgent(agentId: string) {
  const userId = await getUserId();
  const [agent] = await db
    .select()
    .from(agents)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));

  if (!agent) throw new Error('Agent not found');

  // Generate mock scan results
  const trustScore = (Math.random() * 40 + 60).toFixed(2);
  const provenance = (Math.random() * 30 + 70).toFixed(2);
  const alignment = (Math.random() * 40 + 60).toFixed(2);
  const compliance = (Math.random() * 30 + 75).toFixed(2);

  const scanId = `scan-${Date.now()}`;
  await db.insert(scans).values({
    id: scanId,
    userId,
    agentId,
    trustScore: trustScore.toString(),
    onChainProvenance: provenance.toString(),
    modelAlignment: alignment.toString(),
    zkCompliance: compliance.toString(),
    status: 'completed',
  });

  // Update agent trust score
  await db
    .update(agents)
    .set({ trustScore })
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));

  revalidatePath('/dashboard');
  return { scanId, trustScore, provenance, alignment, compliance };
}

export async function getAgentScans(agentId: string) {
  const userId = await getUserId();
  return db
    .select()
    .from(scans)
    .where(and(eq(scans.agentId, agentId), eq(scans.userId, userId)))
    .orderBy(desc(scans.createdAt));
}

export async function addToWatchlist(agentId: string) {
  const userId = await getUserId();
  const id = `watchlist-${Date.now()}`;

  await db.insert(watchlist).values({
    id,
    userId,
    agentId,
  });

  revalidatePath('/watchlist');
  return { success: true };
}

export async function removeFromWatchlist(agentId: string) {
  const userId = await getUserId();
  await db
    .delete(watchlist)
    .where(and(eq(watchlist.agentId, agentId), eq(watchlist.userId, userId)));

  revalidatePath('/watchlist');
  return { success: true };
}

export async function getWatchlist() {
  const userId = await getUserId();
  return db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, userId));
}

export async function getComplianceEvents(agentId?: string) {
  const userId = await getUserId();
  
  if (agentId) {
    return db
      .select()
      .from(complianceEvents)
      .where(and(eq(complianceEvents.userId, userId), eq(complianceEvents.agentId, agentId)))
      .orderBy(desc(complianceEvents.timestamp));
  }

  return db
    .select()
    .from(complianceEvents)
    .where(eq(complianceEvents.userId, userId))
    .orderBy(desc(complianceEvents.timestamp));
}

export async function getNotifications() {
  const userId = await getUserId();
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(10);
}

export async function markNotificationAsRead(notificationId: string) {
  const userId = await getUserId();
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(and(eq(notifications.id, notificationId), eq(notifications.userId, userId)));

  revalidatePath('/dashboard');
  return { success: true };
}
