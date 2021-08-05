import { Gender, HealthCheckRating, OccupationalHealthSick } from '../../types'
import { OcupationalHealthSickDto } from './dto'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

type PrimitiveTypes = 'string' | 'number' | 'object' | 'function' | 'bool'

export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined

export const isOfPrimitiveType = <T>(
  arr: any[],
  type: PrimitiveTypes
): arr is T[] => {
  return arr.every(el => typeof el === type)
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender)
}

export const isSickLeave = (gender: OcupationalHealthSickDto): gender is OccupationalHealthSick => {
  return (isDate(gender.endDate) && isDate(gender.startDate))
}

export const isWhithinRanking = (
  ranking: any
): ranking is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(ranking)
}

export const parseName = (text: unknown): string => {
  if (!text || !isString(text)) throw new Error('incorrect or missing name')
  return text
}

export const parseString = (field: unknown, errorField: string): string => {
  if (!field || !isString(field))
    throw new Error(`incorrect or missing ${errorField}`)
  return field
}

export const parseArray = <T>(
  field: unknown,
  type: PrimitiveTypes,
  errorField: string
): Array<T> => {
  if (!Array.isArray(field) || !isOfPrimitiveType<T>(field, type))
    throw new Error(`incorrect or missing ${errorField}`)
  return field
}

export const parseDate = (date: string | undefined): string => {
  if (!date || !isDate(date))
    throw new Error(`incorrect or missing date ${date}`)
  return date
}

export const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error(`incorrect or missing ssn ${ssn}`)
  return ssn
}

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error(`incorrect or missing gender ${gender}`)
  return gender
}
export const parseRanking = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isWhithinRanking(healthCheckRating))
    throw new Error(`incorrect or missing ranking ${healthCheckRating}`)
  return healthCheckRating
}

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error(`incorrect or missing occupation ${occupation}`)
  return occupation
}

export const parseSickLeave = (sick: OcupationalHealthSickDto | undefined): OccupationalHealthSick | undefined => {
  if (sick && !isSickLeave(sick))
    throw new Error(`incorrect or missing occupation ${sick}`)
  return sick
}
