// api/auth.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.URL, process.env.KEY)

export default async function handler(req,res){

const {key} = req.query

const { data } = await supabase
.from('keys')
.select('*')
.eq('key', key)
.single()

if(!data) return res.json({vip:false})

if(Date.now() > data.expire){
  return res.json({vip:false, expired:true})
}

res.json({vip:true})
}
