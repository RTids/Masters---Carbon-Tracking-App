import { signup } from '../login/actions'

export default function SignUpPage() {
	return (
		<form>
			<label htmlFor='email'>Email:</label>
			<input id='email' name='email' type='email' required />
			<label htmlFor='password'>Password:</label>
			<input id='password' name='password' type='password' required />
            <label htmlFor='first_name'>First Name:</label>
			<input id='first_name' name='first_name' type='text' required />
            <label htmlFor='last_name'>First Name:</label>
			<input id='last_name' name='last_name' type='text' required />
			<button formAction={signup}>Sign up</button>
		</form>
	);
}