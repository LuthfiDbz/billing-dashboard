import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { AddInvoiceForm } from "@/components/invoices/AddInvoiceForm";
import { columns, Invoice } from "@/components/invoices/column";
import { createClient } from "@/lib/supabase/server";

// Dummy data - akan diganti dengan fetch dari Supabase
// const dummyInvoices: Invoice[] = [
//   {
//     id: "2640-inv-001",
//     customer_name: "BROWN LLP",
//     amount: 1050000,
//     status: "Paid",
//     due_date: "2024-05-01T00:00:00Z",
//     created_at: "2024-04-15T00:00:00Z",
//   },
//   {
//     id: "7163-inv-002",
//     customer_name: "TAYLOR LAW",
//     amount: 1275000,
//     status: "Overdue",
//     due_date: "2024-05-01T00:00:00Z",
//     created_at: "2024-04-16T00:00:00Z",
//   },
//   {
//     id: "8204-inv-003",
//     customer_name: "ACME CORP",
//     amount: 1375000,
//     status: "Paid",
//     due_date: "2024-06-15T00:00:00Z",
//     created_at: "2024-05-01T00:00:00Z",
//   },
//   {
//     id: "9824-inv-004",
//     customer_name: "PATEL & CO.",
//     amount: 1475000,
//     status: "Paid",
//     due_date: "2024-10-02T00:00:00Z",
//     created_at: "2024-09-18T00:00:00Z",
//   },
//   {
//     id: "3765-inv-005",
//     customer_name: "SILVA & SONS",
//     amount: 1475000,
//     status: "Draft",
//     due_date: "2024-11-15T00:00:00Z",
//     created_at: "2024-11-01T00:00:00Z",
//   },
// ];

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: invoices } = await supabase.from('invoices').select('*')
  console.log("=========")
  console.log(invoices)


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
          <InvoiceTable columns={columns} data={invoices!} />
        </main>
      </div>
    </div>
  );
}