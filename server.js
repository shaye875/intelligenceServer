import express, { json } from 'express'
import { promises as fs, readFile } from 'fs'
import { writeAgent, updataAgent } from './utils/agent.js'
import { writeReport, updataReport } from './utils/report.js'

const pathAgents = "data/agents.json"
const pathUsers = "data/users.json"
const pathReports = "data/reports.json"

const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("server run");
})

app.get("/health", (req, res) => {
    res.json({ ok: true })
})

app.get("/agents", async (req, res) => {
    try {
        const data = await fs.readFile(pathAgents, "utf8")
        const agents = await JSON.parse(data)
        res.json(agents)
    } catch (err) {
        res.json({ false: err })
    }
})

app.get("/agents/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await fs.readFile(pathAgents, "utf8")
        const agents = await JSON.parse(data)
        for (let a of agents) {
            if (String(a.id) === String(id)) {
                res.json(a)
            }
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.use("/agentss", async (req, res, next) => {
    const hader = req.headers
    const name = hader.username
    const password = hader.password
    try {
        let bool = false
        const data = await fs.readFile(pathUsers, "utf8")
        const users = await JSON.parse(data)
        for (let u of users) {
            if (String(u.username) === String(name) && String(u.password) === String(password)) {
                bool = true
                next()
            }
        }
        if (bool === false) {
            res.status(401)
            res.json({ false: "user not exist" })
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.post("/agentss", async (req, res) => {
    const body = req.body
    const obj = await writeAgent(body)
    for (let k in obj) {
        if (Boolean(k) === true) {
            res.json(obj[k])
        } else {
            if (obj[k] === "missing data") {
                res.status(400)
                res.json(obj)
            } else {
                res.status(409)
                res.json(obj)
            }
        }
    }
})

app.use("/agentss/:id", async (req, res, next) => {
    const hader = req.headers
    const name = hader.username
    const password = hader.password
    try {
        let bool = false
        const data = await fs.readFile(pathUsers, "utf8")
        const users = await JSON.parse(data)
        for (let u of users) {
            if (String(u.username) === String(name) && String(u.password) === String(password)) {
                bool = true
                next()
            }
        }
        if (bool === false) {
            res.status(401)
            res.json({ false: "user not exist" })
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.put("/agentss/:id", async (req, res) => {
    const { id } = req.params
    const body = req.body
    const obj = await updataAgent(id, body)
    for (let k in obj) {
        if (Boolean(k) === true) {
            res.json(obj[k])
        } else {
            res.json(obj)
        }
    }
})

app.delete("/agents/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await fs.readFile(pathAgents, "utf8")
        const agents = await JSON.parse(data)
        for (let a of agents) {
            if (String(a.id) === String(id)) {
                agents.splice(agents.indexOf(a), 1)
                await fs.writeFile(pathAgents, JSON.stringify(agents))
                res.json({ remove: "ok" })
                return
            }
        }
        res.status(404)
        res.json({ "false": "not found" })

    } catch (err) {
        res.json({ false: err })
    }
})

app.get("/reports", async (req, res) => {
    try {
        const data = await fs.readFile(pathReports, "utf8")
        const reports = await JSON.parse(data)
        res.json(reports)
    } catch (err) {
        res.json({ false: err })
    }
})

app.get("/reports/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await fs.readFile(pathReports, "utf8")
        const reports = await JSON.parse(data)
        for (let a of reports) {
            if (string(a.id) === String(id)) {
                res.json(a)
            }
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.use("/reportss", async (req, res, next) => {
    const hader = req.headers
    const name = hader.username
    const password = hader.password
    try {
        let bool = false
        const data = await fs.readFile(pathUsers, "utf8")
        const users = await JSON.parse(data)
        for (let u of users) {
            if (String(u.username) === String(name) && String(u.password) === String(password)) {
                bool = true
                next()
            }
        }
        if (bool === false) {
            res.status(401)
            res.json({ false: "user not exist" })
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.post("/reportss", async (req, res) => {
    const body = req.body
    const obj = await writeReport(body)
    for (let k in obj) {
        if (Boolean(k) === true) {
            res.json(obj[k])
        } else {
            if (obj[k] === "missing data") {
                res.status(400)
                res.json(obj)
            } else if (obj[k] === "id alredy exisit") {
                res.status(404)
                res.json(obj)
            } else {
                res.status(409)
                res.json(obj)
            }
        }
    }
})

app.use("/reportss/:id", async (req, res, next) => {
    const hader = req.headers
    const name = hader.username
    const password = hader.password
    try {
        let bool = false
        const data = await fs.readFile(pathUsers, "utf8")
        const users = await JSON.parse(data)
        for (let u of users) {
            if (String(u.username) === String(name) && String(u.password) === String(password)) {
                bool = true
                next()
            }
        }
        if (bool === false) {
            res.status(401)
            res.json({ false: "user not exist" })
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.put("/reportss/:id", async (req, res) => {
    const { id } = req.params
    const body = req.body
    const obj = await updataReport(id, body)
    for (let k in obj) {
        if (Boolean(k) === true) {
            res.json(obj[k])
        } else {
            res.json(obj)
        }
    }
})

app.use("/reportsss/:id",async(req,res,next)=>{
    const hader = req.headers
    const name = hader.username
    const password = hader.password
    try {
        let bool = false
        const data = await fs.readFile(pathUsers, "utf8")
        const users = await JSON.parse(data)
        for (let u of users) {
            if (String(u.username) === String(name) && String(u.password) === String(password)) {
                bool = true
                next()
            }
        }
        if (bool === false) {
            res.status(401)
            res.json({ false: "user not exist" })
        }
    } catch (err) {
        res.json({ false: err })
    }
})

app.delete("/reportsss/:id",async(req,res)=>{
    const { id } = req.params
    try {
        const data = await fs.readFile(pathReports, "utf8")
        const reports = await JSON.parse(data)
        for (let a of reports) {
            if (String(a.id) === String(id)) {
                reports.splice(reports.indexOf(a), 1)
                await fs.writeFile(pathReports, JSON.stringify(reports))
                res.json({ remove: "ok" })
                return
            }
        }
        res.status(404)
        res.json({ "false": "not found" })

    } catch (err) {
        res.json({ false: String(err) })
    }
})