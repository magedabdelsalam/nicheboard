import { createClient } from '../../../../utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    const { id } = params
    console.log(`API route: Fetching job with id ${id}`)
    const supabase = createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select(`
            *,
            profiles (avatar_url, full_name)
        `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching job:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    const jobWithUserInfo = {
        ...data,
        user_avatar: data.profiles?.avatar_url,
        user_full_name: data.profiles?.full_name
    }

    return NextResponse.json(jobWithUserInfo)
}
