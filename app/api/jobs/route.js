import { createClient } from '../../../utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    console.log('API route: Fetching jobs')
    const supabase = createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select(`
            *,
            profiles (avatar_url, full_name)
        `)
    if (error) {
        console.error('Error fetching jobs:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.log('API route: Fetched jobs:', data)
    const jobsWithUserInfo = data ? data.map(job => ({
        ...job,
        user_avatar: job.profiles?.avatar_url,
        user_full_name: job.profiles?.full_name
    })) : []
    return NextResponse.json(jobsWithUserInfo)
}

