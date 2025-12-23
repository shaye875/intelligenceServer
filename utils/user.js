import {promises as fs} from 'fs'

export async function isUser(name,password){
    const data = await fs.readFile("./data/users.json","utf8")
    const users = await JSON.parse(data)
    for(let u of users){
        if(u.username === name && u.password === password){
            return true
        }
    }
    return false
}