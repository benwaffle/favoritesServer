'use strict';

const express = require('express')
const https = require('https')
const fs = require('fs')

const app = express()

let interested = {}

app.get('/api/interested', (req, res) => {
    res.json(interested)
})

app.post('/api/interested/:classid/:user', (req, res) => {
    const { classid, user } = req.params
    interested[classid] = interested[classid] || []
    interested[classid].push(user)
    res.send('ok')
})

app.get('/api/interested/:classid', (req, res) => {
    const users = interested[req.params.classid]
    if (users)
        res.json({ count: users.length })
    else
        res.json({ count: 0 })
})

https.createServer({
    key: fs.readFileSync(process.env.KEYPATH + '/privkey.pem'),
    cert: fs.readFileSync(process.env.KEYPATH + '/cert.pem')
}, app).listen(3000, () => {
    console.log('listening on https://localhost:3000')
})
