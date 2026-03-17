export default function handler(req,res){

const amount = 99
const phone = "0812345678"

const qr = `https://promptpay.io/${phone}/${amount}`

res.json({qr, amount})

}
