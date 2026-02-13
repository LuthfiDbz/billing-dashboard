'use server' // Wajib ada di baris paling atas

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAsGuest() {
  const supabase = await createClient()


  const email = process.env.NEXT_PUBLIC_SUPABASE_SUPERADMIN!
	const password = process.env.NEXT_PUBLIC_SUPABASE_SUPERADMIN_PASS!

	const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
	})

	if (error) {
    return { error: error.message }
  }

	redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error logging out:', error.message)
    return { error: error.message }
  }

  redirect('/login')
}