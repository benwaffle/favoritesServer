'use strict';

const express = require('express')

const app = express()

let interested = {}

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

app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
})
