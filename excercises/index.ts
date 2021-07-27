import express, { Request, Response } from 'express'

const PORT =  3000
const app = express()


app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
})

app.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello Full Stack!')
})


app.get('*', (_req: Request, res: Response) => {
    res.send('not found')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
