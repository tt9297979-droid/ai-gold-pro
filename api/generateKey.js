// api/generateKey.js
import fs from "fs"

function genKey(){
  return Math.random().toString(36).substring(2,10).toUpperCase()
}

export default function handler(req,res){

let {user} = req.query

let db = JSON.parse(fs.readFileSync("db/db.json"))

let key = genKey()

db.keys[key] = {
  user:user,
  expire: Date.now() + 7*24*60*60*1000
}

fs.writeFileSync("db/db.json", JSON.stringify(db))

res.json({key})

}
