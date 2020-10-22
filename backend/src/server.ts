import express from 'express'
import path from 'path'

import './database/connection'
import routes from './routes'

const app = express()
 
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads' )))
const port = 3333
console.log(`localhost:${port}`);

app.listen(port)
