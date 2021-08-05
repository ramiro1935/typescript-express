import { v1 as uuid } from 'uuid'
import {  NewEntry, NewPatient, NonSensitivePacient, Patient } from "../../types"
import { data } from "../data/patients"

const getAllPatients = (): NonSensitivePacient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name, 
        dateOfBirth,
        gender,
        occupation
    }))
}

const getPatientById = (id: string): Patient | null => {
    const patient = data.find(p => p.id === id)
    if(patient){
        return patient
    }
    return null
}

const createPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object
    }
    data.push(newPatient)
    return newPatient
}
const createPatientEntry = (object: NewEntry, id: string): Patient => {
    const patient = data.find(p => p.id === id)
    if(!patient) throw new Error(`patient doesn't exist in database`)
    const newEnty = {
        id: uuid(),
        ...object
    }
    patient.entries.push(newEnty)
    return patient
}

export default {
    getAllPatients,
    getPatientById,
    createPatient,
    createPatientEntry
}