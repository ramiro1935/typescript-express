import {
  parseArray,
  parseDate,
  parseGender,
  parseName,
  parseOccupation,
  parseRanking,
  parseSSN,
  parseString,
} from './index'

import { NewEntry, NewPatient } from '../../types'
import { Field, NewEntryDto } from './dto'

export const toNewPatient = (body: Field): NewPatient => {
  const newPatient = {
    name: parseName(body.name),
    dateOfBirth: parseDate(body.dateOfBirth),
    ssn: parseSSN(body.ssn),
    entries: body.entries,
    gender: parseGender(body.gender),
    occupation: parseOccupation(body.occupation),
  }
  return newPatient
}

export const toNewEntry = (body: NewEntryDto): NewEntry => {
  let baseEntry = toNewBaseEntry(body) as NewEntry

  switch (body.type) {
    case 'HealthCheck':
      baseEntry = toNewHealthEntry(baseEntry, body)
      break
    case 'Hospital':
      baseEntry = toNewHospitalEntry(baseEntry, body)
      break
    case 'OccupationalHealthcare':
      baseEntry = toNewOccupationalEntry(baseEntry, body)
      break
    default:
      throw new Error('type of entry doesnt support')
  }
  return baseEntry
}

const toNewBaseEntry = (body: NewEntryDto) => {
  let newEntry = {
    description: parseString(body.description, 'description'),
    date: parseDate(body.date),
    specialist: parseString(body.specialist, 'specialist'),
    type: body.type,
  }

  if (body.diagnosisCodes) {
    newEntry = {
      ...newEntry,
      diagnosisCodes: parseArray<string>(
        body.diagnosisCodes,
        'string',
        'diagnosisCode'
      ),
    } as NewEntry
  }
  return newEntry
}
const toNewHealthEntry = (entry: NewEntry, body: NewEntryDto) => {
  const newEntry = {
    ...entry,
    healthCheckRating: parseRanking(body.healthCheckRating),
  } as NewEntry
  return newEntry
}
const toNewHospitalEntry = (entry: NewEntry, body: NewEntryDto) => {
  const newEntry = {
    ...entry,
    discharge: {
      date: parseDate(body.discharge?.date),
      criteria: parseString(body.discharge?.criteria, 'criteria'),
    },
  } as NewEntry
  return newEntry
}
const toNewOccupationalEntry = (entry: NewEntry, body: NewEntryDto) => {
  let newEntry = {
      employerName: parseString(body.employerName,'employerName')
  } as NewEntry
  if (body.sickLeave) {
    newEntry = {
      ...entry,
      sickLeave: {
        startDate: parseDate(body.sickLeave?.startDate),
        endDate: parseDate(body.sickLeave?.endDate),
      },
    } as NewEntry
  }
  return newEntry
}
