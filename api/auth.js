// api/auth.js
import fs from "fs"

export default function handler(req,res){

let {key} = req.query

let db = JSON.parse(fs.readFileSync("db/db.json"))

if(!db.keys[key]){
  return res.json({vip:false})
}

if(Date.now() > db.keys[key].expire){
  return res.json({vip:false, expired:true})
}

res.json({vip:true})

}
