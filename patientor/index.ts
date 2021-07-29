import express from 'express'
import cors from 'cors'
import diagnosesRouter from './src/routes/diagnoses'
import patientRouter from './src/routes/patients'

const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.get('/api/ping', (_req, res) => {
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


