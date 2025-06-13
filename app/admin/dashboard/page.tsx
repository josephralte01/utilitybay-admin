// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  profit: number;
  topRegions: { region: string; orders: number }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://utilitybay-backend.onrender.com/api/analytics")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="bg-muted animate-pulse">
                <CardContent className="p-4 h-[80px]" />
              </Card>
            ))}
        </div>
      )}

      {error && <p className="text-red-500">❌ {error}</p>}

      {data && !loading && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-zinc-900">
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Total Sales</p>
                <p className="text-xl font-bold">{formatCurrency(data.totalSales)}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900">
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-xl font-bold">{data.totalOrders.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900">
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Average Order Value</p>
                <p className="text-xl font-bold">{formatCurrency(data.avgOrderValue)}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900">
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Total Profit</p>
                <p className="text-xl font-bold">{formatCurrency(data.profit)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Bar Chart */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">📍 Orders by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topRegions}>
                <XAxis dataKey="region" stroke="#8884d8" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
