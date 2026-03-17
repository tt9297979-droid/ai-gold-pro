import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.URL, process.env.KEY)

function genKey(){
  return Math.random().toString(36).substring(2,10).toUpperCase()
}

export default async function handler(req,res){

const {user_id} = req.body

const key = genKey()

await supabase.from('keys').insert({
  key:key,
  user_id:user_id,
  expire: Date.now() + (7*24*60*60*1000)
})

res.json({key})
}
