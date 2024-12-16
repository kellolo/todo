import 'dotenv/config'
import { Server } from 'src/server'
import { dataBase } from 'src/data'

dataBase.initialize()

const api = new Server()

api.start()
