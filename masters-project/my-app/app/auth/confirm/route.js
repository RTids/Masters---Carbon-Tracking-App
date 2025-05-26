import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type');
	const next = '/dashboard';

	// Create redirect link without the secret token
	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (token_hash && type) {
		const supabase = await createClient();

		const { data: verifyData, error: verifyError } =
			await supabase.auth.verifyOtp({
				type,
				token_hash,
			});

		if (!verifyError && verifyData?.user?.id) {
			const userID = verifyData.user.id;

			const { error: updateError } = await supabase
				.from('profiles')
				.update({ email_confirmed_at: new Date().toISOString() })
				.eq('id', userID);

			if (updateError) {
				console.error(
					'❌ Failed to update profiles.email_confirmed_at:',
					updateError
				);
			} else {
				console.log('✅ Profile updated with email_confirmed_at timestamp');
			}

			const html = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
				<title>Email Confirmed</title>
				<style>
					body { font-family: Arial, sans-serif; padding: 2rem; text-align: center; }
					h1 { color: #2c3e50; }
					p { font-size: 1.2rem; }
				</style>
				</head>
				<body>
				<h1>Thank you for confirming your email!</h1>
				<p>You can now return to your original tab and continue using the app.</p>
				</body>
				</html>
			`;
			return new NextResponse(html, {
				headers: { 'Content-Type': 'text/html' },
			});
		}
	}

	// return the user to an error page with some instructions
	redirectTo.pathname = '/error';
	return NextResponse.redirect(redirectTo);
}
