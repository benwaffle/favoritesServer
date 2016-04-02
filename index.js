'use strict';

const express = require('express')
const https = require('https')
const fs = require('fs')

const app = express()
app.use(require('body-parser').json())

let interested = {}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/interested', (req, res) => {
    res.json(interested)
})

app.post('/api/interested/:user', (req, res) => {
    const { user } = req.params
    for (const c in interested) {
	const index = interested[c].indexOf(user)
	if (index > -1)
		interested[c].splice(index, 1)
    }

    const { classes } = req.body
    console.log(req.body)
    for (let i=0; i<classes.length; ++i) {
        const c = classes[i]
        interested[c] = interested[c] || [];
        interested[c].push(user)
    }
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
