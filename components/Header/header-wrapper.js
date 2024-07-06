import { createClient } from '../../utils/supabase/server'
import Header from './page'

export default async function HeaderWrapper() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <Header user={user} />
}