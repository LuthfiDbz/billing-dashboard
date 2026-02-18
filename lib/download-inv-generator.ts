import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export interface InvoiceData {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_address?: string;
  invoice_number: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  due_date: string;
  created_at: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export function generateInvoicePDF(invoice: InvoiceData) {
  const doc = new jsPDF();

  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246]; // blue-500
  const textColor: [number, number, number] = [31, 41, 55]; // gray-800
  const mutedColor: [number, number, number] = [107, 114, 128]; // gray-500

  // Header - Company Info
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 20, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("FinBill Fintech Solutions", 20, 28);
  doc.text("invoice@finbill.com | +62 812-3456-7890", 20, 34);

  // Invoice ID & Status
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice Number: #${invoice.invoice_number.toUpperCase()}`, 140, 20);

  // Status Badge
  const statusColors: Record<string, [number, number, number]> = {
    Paid: [34, 197, 94], // green-500
    Pending: [234, 179, 8], // yellow-500
    Overdue: [239, 68, 68], // red-500
    Draft: [234, 179, 8], // yellow-500
  };
  const statusColor = statusColors[invoice.status];
  doc.setFillColor(...statusColor);
  doc.roundedRect(140, 24, 25, 6, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.status, 152.5, 28.5, { align: "center" });

  // Reset color
  doc.setTextColor(...textColor);

  // Customer Info
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 20, 55);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.customer_name, 20, 62);
  if (invoice.customer_email) {
    doc.text(invoice.customer_email, 20, 68);
  }
  if (invoice.customer_address) {
    doc.text(invoice.customer_address, 20, 74);
  }

  // Invoice Dates
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedColor);
  doc.text("Issue Date:", 140, 55);
  doc.text("Due Date:", 140, 62);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  doc.text(
    format(new Date(invoice.created_at), "dd MMMM yyyy", { locale: id }),
    170,
    55
  );
  doc.text(
    format(new Date(invoice.due_date), "dd MMMM yyyy", { locale: id }),
    170,
    62
  );

  // Items Table
  const tableStartY = 90;

  // Jika ada items detail
  if (invoice.items && invoice.items.length > 0) {
    autoTable(doc, {
      startY: tableStartY,
      head: [["Description", "Qty", "Unit Price", "Total"]],
      body: invoice.items.map((item) => [
        item.description,
        item.quantity.toString(),
        formatCurrency(item.unit_price),
        formatCurrency(item.total),
      ]),
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
      },
      styles: {
        fontSize: 9,
        cellPadding: 5,
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // gray-50
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 40, halign: "right" },
        3: { cellWidth: 40, halign: "right" },
      },
    });
  } else {
    // Jika tidak ada items, tampilkan single row
    autoTable(doc, {
      startY: tableStartY,
      head: [["Description", "Amount"]],
      body: [["Service/Product", formatCurrency(invoice.amount)]],
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
      },
      styles: {
        fontSize: 9,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 140 },
        1: { cellWidth: 40, halign: "right" },
      },
    });
  }

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || tableStartY + 30;

  // Total Amount Box
  doc.setFillColor(249, 250, 251); // gray-50
  doc.rect(130, finalY + 10, 60, 15, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", 125, finalY + 18);
  doc.setFontSize(13);
  doc.setTextColor(...primaryColor);
  doc.text(formatCurrency(invoice.amount), 185, finalY + 18, {
    align: "right",
  });

  // Footer
  doc.setTextColor(...mutedColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Thank you for your business!",
    105,
    finalY + 40,
    { align: "center" }
  );
  doc.text(
    "For any questions, please contact us at invoice@finbill.com",
    105,
    finalY + 46,
    { align: "center" }
  );

  // Page number
  doc.text(
    `Generated on ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
    105,
    285,
    { align: "center" }
  );

  // Save PDF
  const fileName = `Invoice_${invoice.id.slice(0, 8)}_${invoice.customer_name.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
}

// Helper function
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}