import { Server } from '@/server'

const api = new Server()

api.start()

// import express, { Request, Response } from 'express'

// const app = express()
// const port = 3000

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from Express with TypeScript! ' + JSON.stringify(process.env))
// })

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`)
// })
