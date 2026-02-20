'use client'

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { InvoiceTable } from "./InvoiceTable";
import { columns, Invoice } from "./column";
import { AddInvoiceForm } from "./AddInvoiceForm";
import { EditInvoiceForm } from "./EditInvoiceForm";
import { DeleteInvoiceDialog } from "./DeleteInvoiceDialog";
import { generateInvoicePDF, InvoiceData } from "@/lib/download-inv-generator";
import { ViewInvoiceDialog } from "./ViewInvoiceDialog";

interface InvoicesDashboardProps {
  dataInvoices: Invoice[];
}

export default function InvoicesDashboard({dataInvoices} : InvoicesDashboardProps) {
	const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);
	const [deleteInvoice, setDeleteInvoice] = useState<Invoice | null>(null);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  // Handler untuk View (opsional - bisa redirect ke detail page)
  const handleView = (invoice: Invoice) => {
    setViewInvoice(invoice);
    setIsViewOpen(true);
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

  const handleDownload = (invoice: Invoice) => {
    const invoiceData: InvoiceData = {
      id: invoice.id || "",
      customer_name: invoice.customer_name,
      customer_email: "customer@example.com", 
      customer_address: "Jakarta, Indonesia", 
      invoice_number: invoice.invoice_number,
      amount: invoice.amount,
      status: invoice.status,
      due_date: invoice.due_date,
      created_at: invoice.created_at,
      items: [
        {
          description: "Professional Services",
          quantity: 1,
          unit_price: invoice.amount,
          total: invoice.amount,
        },
      ],
    };

    generateInvoicePDF(invoiceData);
  };

  const defaultColumns = columns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onDownload: handleDownload,
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
      />

      <ViewInvoiceDialog
        invoice={viewInvoice}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />
    </div>
  );
}