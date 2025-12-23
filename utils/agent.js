import { promises as fs } from 'fs'

const pathAgents = "./data/agents.json"

async function isAgent(agent) {
    if (typeof agent != 'object') {
        return false
    }
    const arr = ["id", "name", "nickname",]
    let count = 0
    for (let k in agent) {
        for (let t of arr) {
            if (String(k).toLowerCase() === String(t).toLowerCase()) {
                count += 1
            }
        }
    }
    if (count === 3) {
        return true
    }
    return false
}

async function uniqId(agent) {
    const data = await fs.readFile(pathAgents, "utf8")
    const agents = await JSON.parse(data)
    for (let a of agents) {
        if (String(a.id) === String(agent.id)) {
            return false
        }
    }
    return true
}

export async function writeAgent(agent) {
    const ifAgent = await isAgent(agent)
    if (ifAgent === false) {
        return { false: "missing data" }
    }
    const uniqe = await uniqId(agent)
    if (uniqe === false) {
        return { false: "id alredy exist" }
    }
    const data = await fs.readFile(pathAgents, "utf8")
    const agents = await JSON.parse(data)
    const obj = {
        id: agent.id,
        name: agent.name,
        nickname: agent.nickname,
        reportsCount: 0
    }
    agents.push(obj)
    await fs.writeFile(pathAgents, JSON.stringify(agents))
    return { true: obj }
}

export async function updataAgent(id, agent) {
    const data = await fs.readFile(pathAgents, "utf8")
    const agents = await JSON.parse(data)
    let bool = false
    for (let a of agents) {
        if (String(a.id) === String(id)) {
            bool = true
            for (let k in agent) {
                a[k] = agent[k]
            }
            await fs.writeFile(pathAgents, JSON.stringify(agents))
            return {true:a}
        }
    }
    return {false:"id not exist"}
}



