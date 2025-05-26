'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { error: error.message };
	}

	return { success: true };
}

export async function signup(formData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
		options: {
			data: {
				first_name: formData.get('first_name'),
				last_name: formData.get('last_name'),
			},
		},
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		return { error: error.message };
	}

	return { success: true };
}
