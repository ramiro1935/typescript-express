import express from 'express'
import patientService from '../services/patientService'
import { toNewEntry, toNewPatient } from '../utils/map'

const router = express.Router()

router.get('/', (_req, res) => {
  return res.json(patientService.getAllPatients())
})

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params as { id: string }
    const createNewEntry = toNewEntry(req.body)
    const newEntry = patientService.createPatientEntry(createNewEntry, id)
    if (newEntry) {
      return res.json(newEntry)
    }
    return res.json({ error: 'patient doesnt exist' })
  } catch (error: any) {
      return res.status(404).json({ error: `an error ocurred ${error.message}`})
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params as { id: string }
  const patient = patientService.getPatientById(id)
  if (patient) {
    return res.json(patient)
  }
  return res.json({ error: 'patient doesnt exist' })
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
