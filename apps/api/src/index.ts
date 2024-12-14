import 'dotenv/config'
import { Server } from 'src/server'

const api = new Server()

api.start()
