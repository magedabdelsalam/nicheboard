const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL

export default function supabaseLoader({ src }) {
  return `${projectId}/storage/v1/object/public/avatars/${src}`
}