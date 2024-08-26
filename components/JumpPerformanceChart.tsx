"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface JumpData {
  name: string;
  height: number;
}

export default function JumpPerformanceChart({ data }: { data: JumpData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="height" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
