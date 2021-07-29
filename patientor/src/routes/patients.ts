import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  return res.json(patientService.getAllPatients())
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body)
    const newPatient = patientService.createPatient(newPatientEntry)
    return res.json(newPatient)
  } catch (error) {
      return res.json({ error: 'ocurrio un error' })
  }
})

export default router
