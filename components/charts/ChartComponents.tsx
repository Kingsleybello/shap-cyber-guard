'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export function TrustScoreChart({ score }: { score: number }) {
  const data = [
    { name: 'Trust Score', value: score },
    { name: 'Risk', value: 100 - score },
  ];

  const colors = score >= 85 ? ['#10b981', '#f3f4f6'] : score >= 70 ? ['#3b82f6', '#f3f4f6'] : ['#eab308', '#f3f4f6'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CredentialDistributionChart({
  data,
}: {
  data: Array<{ name: string; value: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          <Cell fill="#3b82f6" />
          <Cell fill="#a855f7" />
          <Cell fill="#10b981" />
          <Cell fill="#f59e0b" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function NetworkActivityChart({
  data,
}: {
  data: Array<{ time: string; scans: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="scans" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrustScoreDistributionChart({
  data,
}: {
  data: Array<{ range: string; count: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function VotingChart({
  votesFor,
  votesAgainst,
}: {
  votesFor: number;
  votesAgainst: number;
}) {
  const data = [
    { name: 'For', value: votesFor },
    { name: 'Against', value: votesAgainst },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          <Cell fill="#10b981" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
