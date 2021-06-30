import express from 'express'
import { getDictionary } from '../controllers/dictionaryController.js'

export const router = express.Router()

router.route('/').get(getDictionary)
