import NoteEditor from '../components/NoteEditor'
import useSWR from 'swr'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)
const fetcher = async () => {
  const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
  return data || []
}

export default function Home(){
  const { data, mutate } = useSWR('notes', fetcher, { fallbackData: [] })
  return (
    <main style={{padding:20,fontFamily:'Inter,system-ui'}}>
      <h1>ALIP Notes Pro — Demo</h1>
      <NoteEditor onSaved={(n)=> mutate(async notes => [n, ...notes])}/>
      <ul>
        {data.map((note)=>(
          <li key={note.id}><strong>{note.title}</strong> — {note.body}</li>
        ))}
      </ul>
    </main>
  )
}
