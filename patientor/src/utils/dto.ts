import { Entry } from '../../types'

export type Field = {
  name: unknown
  dateOfBirth: string
  ssn: unknown
  gender: unknown
  occupation: unknown
  entries: Entry[]
}

export type DischargeDto = {
  date: string
  criteria: unknown
}

export type OcupationalHealthSickDto = {
  startDate: string
  endDate: string
}
export type NewEntryDto = {
  description: unknown
  date: string
  specialist: unknown
  type: Entry['type']
  diagnosisCodes?: unknown
  healthCheckRating?: number
  discharge?: DischargeDto
  employerName?: unknown
  sickLeave?: OcupationalHealthSickDto
}
