import express from 'express'
import diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils'

const route = express.Router()

route.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))
  if (diary) {
    return res.json(diary)
  }
  return res.json({ error: 'diary doesnt exist in database' })
})

route.get('/', (_req, res) => {
  return res.json(diaryService.getNonSensitiveEntries())
})

route.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addEntry = diaryService.addDiary(newDiaryEntry)
    return res.json(addEntry)
  } catch (e) {
   return res.status(400).send(e.message)
  }
})

export default route
