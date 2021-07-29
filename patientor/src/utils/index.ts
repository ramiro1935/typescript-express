import { Gender, NewPatient } from '../../types'

type Field = {
  name: unknown
  dateOfBirth: string
  ssn: unknown
  gender: unknown
  occupation: unknown
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender)
}

export const toNewPatient = (body: Field): NewPatient => {
  const newPatient = {
    name: parseName(body.name),
    dateOfBirth: parseDate(body.dateOfBirth),
    ssn: parseSSN(body.ssn),
    gender: parseGender(body.gender),
    occupation: parseOccupation(body.occupation),
  }
  return newPatient
}

const parseName = (text: unknown): string => {
  if (!text || !isString(text)) throw new Error('incorrect or missing name')
  return text
}

const parseDate = (date: string): string => {
  if (!date || !isDate(date)) throw new Error(`incorrect or missing date ${date}`)
  return date
}

const parseSSN = (ssn: unknown): string => {
    if(!isString(ssn)) throw new Error(`incorrect or missing ssn ${ssn}`)
    return ssn
}

const parseGender = (gender: unknown): Gender => {
    if( !gender || !isGender(gender)) throw new Error(`incorrect or missing gender ${gender}`)
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if( !occupation || !isString(occupation)) throw new Error(`incorrect or missing occupation ${occupation}`)
    return occupation
}
