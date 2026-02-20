"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Invoice } from "./column";
import { deleteInvoice } from "@/app/dashboard/invoices/action";

interface DeleteInvoiceDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (invoiceId: string) => Promise<void>;
}

export function DeleteInvoiceDialog({
  invoice,
  open,
  onOpenChange,
}: DeleteInvoiceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!invoice) return;

    setIsDeleting(true)
    try {
      const result = await deleteInvoice(invoice?.id || "")
      if (result?.error) return alert(result.error)
      onOpenChange(false);
      alert(`Invoice deleted successfully!`);
    } catch (err) {
      console.error(err)
      alert("Failed to delete invoice. Please try again.");
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the invoice
            for <span className="font-semibold">{invoice?.customer_name}</span> with
            invoice number <span className="font-mono">#{invoice?.invoice_number}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Invoice"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}