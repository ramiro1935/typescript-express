import { Diagnoses } from "../../types"
import { data } from "../data/diagnoses"

const getAllDiagnoses = (): Diagnoses[]=> {
    return data
}

export default {
    getAllDiagnoses
}