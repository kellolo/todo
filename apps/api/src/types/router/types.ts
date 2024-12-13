import { Request, Response } from 'express'

export type REQUEST<TBody = {}, TParams = {}, TQuery = {}> = Request<TParams, {}, TBody, TQuery>
