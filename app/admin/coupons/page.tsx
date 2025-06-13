"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Coupon {
  _id?: string;
  code: string;
  type: "flat" | "percent";
  discount: number;
  maxDiscount?: number;
  minOrderValue?: number;
  maxOrderValue?: number;
  usageLimit?: number;
  perUserLimit?: number;
  expiresAt?: string;
  freeShipping?: boolean;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState<Coupon>({
    code: "",
    type: "flat",
    discount: 0,
    freeShipping: false
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("/api/coupons");
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to load coupons");
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("/api/coupons", form);
      toast.success("Coupon created");
      fetchCoupons();
    } catch (err) {
      toast.error("Error creating coupon");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/coupons/${id}`);
      toast.success("Deleted");
      fetchCoupons();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🎟️ Coupon Management</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">➕ Create Coupon</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Code</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            </div>
            <div>
              <Label>Discount</Label>
              <Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>Type</Label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "flat" | "percent" })} className="w-full border rounded px-3 py-2">
                <option value="flat">Flat</option>
                <option value="percent">Percent</option>
              </select>
            </div>
            <div>
              <Label>Free Shipping</Label>
              <input type="checkbox" checked={form.freeShipping} onChange={(e) => setForm({ ...form, freeShipping: e.target.checked })} />
            </div>
          </div>
          <Button onClick={handleCreate} className="mt-4">Create</Button>
        </CardContent>
      </Card>

      {/* Coupon List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">📋 Existing Coupons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Free Shipping</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-2">{c.code}</td>
                  <td className="px-4 py-2">{c.type}</td>
                  <td className="px-4 py-2">{c.discount}</td>
                  <td className="px-4 py-2">{c.freeShipping ? "✅" : "❌"}</td>
                  <td className="px-4 py-2">
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id!)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
