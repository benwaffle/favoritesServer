'use strict';

const express = require('express')

const app = express()

let count = {'CAL103': 3, 'CS181': 0 }

app.get('/api/interested/:classid', (req, res) => {
    res.json({ count: count[req.params.classid] })
})

app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
})
