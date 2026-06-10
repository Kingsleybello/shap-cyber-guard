import { pgTable, text, timestamp, boolean, integer, numeric, index } from 'drizzle-orm/pg-core';

// ===== Better Auth Tables =====
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  name: text('name'),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refreshToken: text('refreshToken'),
  accessToken: text('accessToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  userId: text('userId').notNull().references(() => user.id),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// ===== SHAP App Tables =====
export const agents = pgTable(
  'agents',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    name: text('name').notNull(),
    agentType: text('agentType').notNull(), // 'trading-bot', 'oracle', 'llm-instance', 'enterprise-ai'
    trustScore: numeric('trustScore', { precision: 5, scale: 2 }).default('0'),
    status: text('status').default('active'), // 'active', 'inactive'
    onChainAddress: text('onChainAddress'),
    enterpriseId: text('enterpriseId'),
    apiEndpoint: text('apiEndpoint'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_agents_userId').on(table.userId),
  })
);

export const scans = pgTable(
  'scans',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    agentId: text('agentId').notNull(),
    trustScore: numeric('trustScore', { precision: 5, scale: 2 }).notNull(),
    onChainProvenance: numeric('onChainProvenance', { precision: 5, scale: 2 }),
    modelAlignment: numeric('modelAlignment', { precision: 5, scale: 2 }),
    zkCompliance: numeric('zkCompliance', { precision: 5, scale: 2 }),
    status: text('status'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_scans_userId').on(table.userId),
    agentIdIdx: index('idx_scans_agentId').on(table.agentId),
  })
);

export const watchlist = pgTable(
  'watchlist',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    agentId: text('agentId').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_watchlist_userId').on(table.userId),
  })
);

export const complianceEvents = pgTable(
  'compliance_events',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    agentId: text('agentId').notNull(),
    eventType: text('eventType').notNull(),
    severity: text('severity').notNull(), // 'info', 'warning', 'critical'
    description: text('description'),
    timestamp: timestamp('timestamp').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_compliance_events_userId').on(table.userId),
  })
);

export const notifications = pgTable(
  'notifications',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    title: text('title').notNull(),
    message: text('message').notNull(),
    type: text('type'),
    isRead: boolean('isRead').default(false),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_notifications_userId').on(table.userId),
  })
);
