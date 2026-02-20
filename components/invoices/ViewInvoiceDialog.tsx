"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Invoice } from "./column";

interface ViewInvoiceDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewInvoiceDialog({
  invoice,
  open,
  onOpenChange,
}: ViewInvoiceDialogProps) {
  if (!invoice) return null;

  const statusVariants = {
    Paid: "default",
    Pending: "secondary",
    Overdue: "destructive",
    Draft: "secondary",
  } as const;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>
            Complete information for invoice #{invoice.invoice_number}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invoice ID */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Invoice Number
            </p>
            <p className="font-mono text-lg font-semibold">
              #{invoice.invoice_number}
            </p>
          </div>

          <Separator />

          {/* Customer Name */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Customer
            </p>
            <p className="text-base font-medium">{invoice.customer_name}</p>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(invoice.amount)}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant={statusVariants[invoice.status]} className="mt-1">
              {invoice.status}
            </Badge>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Due Date
              </p>
              <p className="text-sm">
                {format(new Date(invoice.due_date), "dd MMMM yyyy", {
                  locale: id,
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
              <p className="text-sm">
                {format(new Date(invoice.created_at), "dd MMMM yyyy", {
                  locale: id,
                })}
              </p>
            </div>
          </div>

          {/* Additional Info (Optional) */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              Full Invoice ID (for internal use)
            </p>
            <p className="font-mono text-xs break-all">{invoice.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}