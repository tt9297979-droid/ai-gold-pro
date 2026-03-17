export default async function handler(req,res){

let {amount, ref} = req.query

// จำลอง AI ตรวจสลิป
if(amount == 99){
  return res.json({valid:true})
}

res.json({valid:false})

}
