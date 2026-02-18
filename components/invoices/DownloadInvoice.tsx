"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Invoice } from "./column";
import { generateInvoicePDF, InvoiceData } from "@/lib/download-inv-generator";

interface DownloadInvoicePDFProps {
  invoice: Invoice;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

export function DownloadInvoice({
  invoice,
  variant = "outline",
  size = "sm",
  showIcon = true,
}: DownloadInvoicePDFProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Convert Invoice to InvoiceData format
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
        // Optional: Jika ada line items
        items: [
          {
            description: "Professional Services",
            quantity: 1,
            unit_price: invoice.amount,
            total: invoice.amount,
          },
        ],
      };

      // Generate PDF
      generateInvoicePDF(invoiceData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className={showIcon ? "mr-2 h-4 w-4 animate-spin" : "h-4 w-4 animate-spin"} />
          {size !== "icon" && "Generating..."}
        </>
      ) : (
        <>
          {showIcon && <Download className={size !== "icon" ? "mr-2 h-4 w-4" : "h-4 w-4"} />}
          {size !== "icon" && "Download PDF"}
        </>
      )}
    </Button>
  );
}