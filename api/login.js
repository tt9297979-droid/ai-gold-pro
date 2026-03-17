import fs from "fs"

export default function handler(req,res){

let {user} = req.query

let db = JSON.parse(fs.readFileSync("db/db.json"))

if(!db.users.includes(user)){
  db.users.push(user)
}

fs.writeFileSync("db/db.json", JSON.stringify(db))

res.json({ok:true})

}
