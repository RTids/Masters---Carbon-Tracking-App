import { createClient } from '@/utils/supabase/server';

export default async function Users() {
	const supabase = await createClient();
	const { data: users } = await supabase.from('Users').select();

	return (
        <div>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            {users?.map((user, index) => {
                return (
                    <div key={index}>
                        <p>{user.email}</p>
                    </div>
                )
            })}
        </div>
    );
}