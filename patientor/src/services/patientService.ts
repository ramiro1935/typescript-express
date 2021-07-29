import { v1 as uuid } from 'uuid'
import { NewPatient, NonSensitivePacient, Patient } from "../../types"
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

const createPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object
    }
    data.push(newPatient)
    return newPatient
}

export default {
    getAllPatients,
    createPatient
}