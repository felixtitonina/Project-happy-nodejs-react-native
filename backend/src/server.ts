import express from 'express'

import './database/connection'
import routes from './routes'

const app = express()
 
app.use(express.json())
app.use(routes)

const port = 3333
console.log(`localhost:${port}`);

app.listen(port)
