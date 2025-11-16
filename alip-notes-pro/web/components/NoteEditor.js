import {useState} from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function NoteEditor({onSaved}){
  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  async function save(){
    const { data, error } = await supabase.from('notes').insert([{title, body}]).select().single()
    if(error){ alert('Error: '+error.message); return }
    onSaved && onSaved(data)
    setTitle(''); setBody('')
  }
  return (
    <div style={{marginBottom:20}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" />
      <br/>
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Isi catatan"></textarea>
      <br/>
      <button onClick={save}>Simpan ke Supabase</button>
    </div>
  )
}
