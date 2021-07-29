
export enum Gender {
    Male = "male",
    Female = "female"
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export interface Diagnoses {
    code: string 
    name: string 
    latin?: string
}

export type NewPatient = Omit<Patient, 'id'>

export type NonSensitivePacient = Omit<Patient, 'ssn'>
