import diaryData from '../data/diaries'

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types'

const diaries: Array<DiaryEntry> = diaryData

const getEntries = () => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

const addDiary = (entry: NewDiaryEntry) : DiaryEntry=> {
  const newDiary = {
      id: Math.max(...diaries.map(d => d.id)) + 1,
      ...entry,
  }
  return newDiary
}

const findById = (id: number): DiaryEntry | undefined => {
    return diaries.find(d => d.id === id)
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
}
