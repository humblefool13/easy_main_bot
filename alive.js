const express = require('express')
const server = express()

server.all('/', (req, res) => res.send('VPS is ready and connection is established.'))
server.listen(3000, () => console.log("VPS Is Ready!"))