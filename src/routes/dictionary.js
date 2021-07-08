import express from 'express'
import { getDictionary, updateDictionary } from '../controllers/dictionaryController.js'

export const router = express.Router()

router.route('/').get(getDictionary).patch(updateDictionary)
