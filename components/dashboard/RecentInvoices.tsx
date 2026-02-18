"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Invoice {
  id: string;
  customer_name: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  due_date: string;
}

interface RecentInvoicesProps {
  invoices: Invoice[];
  limit?: number;
}

const statusVariants = {
  Paid: "default",
  Pending: "secondary",
  Overdue: "destructive",
} as const;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export function RecentInvoices({ invoices, limit = 5 }: RecentInvoicesProps) {
  const recentInvoices = invoices.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Invoices</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/invoices">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium">{invoice.customer_name}</p>
                <p className="text-sm text-muted-foreground">
                  #{invoice.id.slice(0, 8)} •{" "}
                  {format(new Date(invoice.due_date), "dd MMM yyyy", {
                    locale: id,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                  <Badge
                    variant={statusVariants[invoice.status]}
                    className="mt-1"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {recentInvoices.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No invoices found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}