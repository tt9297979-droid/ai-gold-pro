export default async function handler(req,res){

const {slip} = req.body

const r = await fetch("https://developer.easyslip.com/api/v1/verify",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    slip_image: slip
  })
})

const data = await r.json()

if(data.data.amount == 99){
  return res.json({valid:true})
}

res.json({valid:false})
}
