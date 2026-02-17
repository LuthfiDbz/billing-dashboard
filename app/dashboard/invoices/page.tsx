import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { AddInvoiceForm } from "@/components/invoices/AddInvoiceForm";
import { columns, Invoice } from "@/components/invoices/column";
import { createClient } from "@/lib/supabase/server";
import InvoicesDashboard from "@/components/invoices/InvoicesDashboard";

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: invoices } = await supabase.from('invoices').select('*').order("created_at")
  console.log("=========")
  console.log(invoices)


  return (
    <>
      <InvoicesDashboard dataInvoices={invoices!} />
    </>
  );
}