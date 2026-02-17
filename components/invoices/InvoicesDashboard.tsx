'use client'

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { InvoiceTable } from "./InvoiceTable";
import { columns, Invoice } from "./column";
import { AddInvoiceForm } from "./AddInvoiceForm";
import { EditInvoiceForm } from "./EditInvoiceForm";
import { DeleteInvoiceDialog } from "./DeleteInvoiceDialog";

interface InvoicesDashboardProps {
  dataInvoices: Invoice[];
}

export default function InvoicesDashboard({dataInvoices} : InvoicesDashboardProps) {
	const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);
	const [deleteInvoice, setDeleteInvoice] = useState<Invoice | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  // Handler untuk View (opsional - bisa redirect ke detail page)
  const handleView = (invoice: Invoice) => {
    console.log("View invoice:", invoice);
    // TODO: Implement view detail
    // router.push(`/dashboard/invoices/${invoice.id}`)
    alert(`View detail for invoice #${invoice.id.slice(0, 8)}`);
  };

  // Handler untuk Edit
  const handleEdit = (invoice: Invoice) => {
    setEditInvoice(invoice);
    setIsEditOpen(true);
  };

  // Handler untuk Delete
  const handleDelete = (invoice: Invoice) => {
    setDeleteInvoice(invoice);
    setIsDeleteOpen(true);
  };

	// Callback untuk konfirmasi delete (opsional)
  const handleConfirmDelete = async (invoiceId: string) => {
    // TODO: Implement Supabase delete
    console.log("Confirmed delete:", invoiceId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const defaultColumns = columns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Navbar */}
        <Navbar title="Invoice Management" />

        {/* Content Area */}
        <main className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
              <p className="text-muted-foreground">
                Manage your customer invoices and billing
              </p>
            </div>
            <AddInvoiceForm />
          </div>

          {/* Table */}
          <InvoiceTable columns={defaultColumns} data={dataInvoices} />
        </main>
      </div>

			<EditInvoiceForm
        invoice={editInvoice}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

			<DeleteInvoiceDialog
        invoice={deleteInvoice}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}