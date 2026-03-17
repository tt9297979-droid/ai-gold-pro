import { exec } from "child_process"

export default function handler(req,res){

exec("python3 ai/model.py", (err, stdout) => {

let data = JSON.parse(stdout)
res.json(data)

})

}
