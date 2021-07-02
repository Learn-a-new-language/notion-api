import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import notion from '@notionhq/client'
import cors from 'cors'

import { router as dictionaryRouter } from './routes/dictionary.js'

dotenv.config({ path: './config.env' })

export const app = express()
export const notionClient = new notion.Client({
  auth: process.env.NOTION_AUTH,
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => res.send('jfk'))
app.use('/api/dictionary', dictionaryRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
