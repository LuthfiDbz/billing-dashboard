"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2, Download } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export type Invoice = {
  id?: string;
  invoice_number: string;
  customer_name: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  due_date: string;
  created_at: string;   
};

const statusVariants = {
  Paid: "default",
  Pending: "secondary",
  Overdue: "destructive",
} as const;

// Type untuk action callbacks
export type InvoiceActions = {
  onView?: (invoice: Invoice) => void;
  onEdit?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
  onDownload?: (invoice: Invoice) => void;
};

export const columns = (actions?: InvoiceActions): ColumnDef<Invoice>[] => [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
    cell: ({ row }) => {
      const num = row.getValue("invoice_number") as string;
      return <span className="font-mono text-sm">#{num}</span>;
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.getValue("customer_name") as string;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
      return <span className="font-semibold">{formatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusVariants;
      return (
        <Badge variant={statusVariants[status]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      const date = row.getValue("due_date") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {format(new Date(date), "dd MMM yyyy", { locale: id })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (actions?.onView) {
                  actions.onView(invoice);
                }
              }}  
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (actions?.onEdit) {
                  actions.onEdit(invoice);
                }
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (actions?.onDownload) {
                  actions.onDownload(invoice);
                }
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                if (actions?.onDelete) {
                  actions.onDelete(invoice);
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];