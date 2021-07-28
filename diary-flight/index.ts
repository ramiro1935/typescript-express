import express from 'express'
import DiaryRoute from './src/routes/diaries'

const app = express()

app.use(express.json())

app.use('/api/diaries',DiaryRoute)

const PORT = 3000 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})