import * as z from "zod";

export const invoiceSchema = z.object({
  id: z.string().optional(),
  invoice_number: z.string(),
  customer_name: z.string().min(3, "Nama minimal 3 karakter").max(50),
  amount: z.coerce.number().positive("Angka harus lebih dari 0"), // coerce handle string ke number otomatis
  due_date: z.date("A"),
  status: z.enum(["Paid", "Pending", "Overdue", "Draft"]),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;