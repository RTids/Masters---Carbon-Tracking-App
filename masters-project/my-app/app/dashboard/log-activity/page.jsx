'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogActivity(){
    const router = useRouter()
    const supabase = createClient()

    
    return (
        <>
            <p>Search Box</p>
            <div>
                <p>Food/Drink</p>
                <p>Travel</p>
                <p>Energy/Home</p>
                <p>Lifestyle</p>
            </div>
        </>
    )
}