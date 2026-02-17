'use server'

import { InvoiceFormValues } from '@/lib/schemas/invoice'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// CREATE
export async function createInvoice(formData: InvoiceFormValues) {
  const supabase = await createClient()
  const { error } = await supabase.from('invoices').insert([formData])

  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/invoices') // Membersihkan cache agar data baru muncul
}

// UPDATE
export async function updateInvoice(id: string, formData: InvoiceFormValues) {
  const supabase = await createClient()
  const { error } = await supabase.from('invoices').update(formData).eq('id', id)

  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/invoices')
}

// DELETE
export async function deleteInvoice(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('invoices').delete().eq('id', id)

  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/invoices')
}