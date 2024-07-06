import { createClient } from '../../../utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select(`
            *,
            profiles (avatar_url)
        `)
    if (error) {
        console.error('Error fetching jobs:', error)
        return NextResponse.json([], { status: 200 })  // Return an empty array with 200 status
    }
    const jobsWithAvatars = data ? data.map(job => ({
        ...job,
        user_avatar: job.profiles?.avatar_url
    })) : []
    return NextResponse.json(jobsWithAvatars)
}