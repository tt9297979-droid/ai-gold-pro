import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.URL, process.env.KEY)

export default async function handler(req,res){

const users = await supabase.from('users').select('*')
const payments = await supabase.from('payments').select('*')
const keys = await supabase.from('keys').select('*')

res.json({
  users: users.data,
  payments: payments.data,
  keys: keys.data
})

}
