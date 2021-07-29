import express from 'express'
import dignosesService from '../services/diagnosesService'

const router = express.Router()

router.get('/', (_req, res) => {
    return res.json(dignosesService.getAllDiagnoses())
})

export default router