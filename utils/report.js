import { promises as fs } from 'fs'

const pathReport = "./data/reports.json"

const pathAgents = "./data/agents.json"

async function isReport(report) {
    if (typeof report != 'object') {
        return false
    }
    const arr = ["id", "date", "content", "agentId"]
    let count = 0
    for (let k in report) {
        for (let t of arr) {
            if (String(k).toLowerCase() === String(t).toLowerCase()) {
              
                count += 1
                
            }
        }
    }
    if (count === 4) {
        return true
    }
    return false
}

async function uniqeId(report) {
    const data = await fs.readFile(pathReport, "utf8")
    const reports = await JSON.parse(data)
    for (let r of reports) {
        if (String(r.id) === String(report.id)) {
            return false
        }
    }
    return true
}

async function isAgent(report) {
    const data = await fs.readFile(pathAgents, "utf8")
    const agents = await JSON.parse(data)
    for (let a of agents) {
        if (String(a.id) === String(report.agentId)) {
            a.reportCount += 1
            await fs.writeFile(pathAgents, JSON.stringify(agents))
            return true
        }
    }
    return false
}

export async function writeReport(report) {
    const ifReport = await isReport(report)
    if (ifReport === false) {
        return { false: "missing data" }
    }
    const ifUniqe = await uniqeId(report)
    if (ifUniqe === false) {
        return { false: "id alredy exisit" }
    }
    const ifAgent = await isAgent(report)
    if (ifAgent === false) {
        return { false: "agentId not exist" }
    }
    const data = await fs.readFile(pathReport, "utf8")
    const reports = await JSON.parse(data)
    const obj = {
        id: report.id,
        date: report.date,
        content: report.content,
        agentId: report.agentId
    }
    reports.push(obj)
    await fs.writeFile(pathReport, JSON.stringify(reports))
    return { true: obj }
}

export async function updataReport(id,report){
    const data = await fs.readFile(pathReport, "utf8")
    const reports = await JSON.parse(data)
    let bool = false
    for (let a of reports) {
        if (String(a.id) === String(id)) {
            bool = true
            for (let k in report) {
                a[k] = report[k]
            }
            await fs.writeFile(pathReport, JSON.stringify(reports))
            return {true:a}
        }
    }
    return {false:"id not exist"}
}