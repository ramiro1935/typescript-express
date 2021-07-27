const multiply = 10000

export interface Result {
    weight: number
    height: number
    bmi: string
  }
  

const getCategory = (result: number) : string => {
    if(result < 16) return "Underweight (Severe thinness)"
    if(result === 16 || result === 17) return "Underweight (Moderate thinness)"
    if(result < 18.5 && result >= 17) return "Underweight (Mild thinness)"
    if(result < 25 && result >= 18.5) return "Normal range"
    if(result < 30 && result >= 25) return "Overweight (Pre-obese)"
    if(result < 35 && result >= 30) return "Obese (Class I)"
    if(result < 40 && result >= 35) return "Obese (Class II)"
    if(result >= 40) return "Obese (Class III)"
    throw Error("Not supported")
}


const calculateBmi = (height: number, weight: number) : Result => {
    try {
        if(height <= 0) throw Error('height cant be less than zero')
        if(weight <= 0) throw Error('weight cant be less than zero')
        const data : number = (weight / height / height) * multiply
        const bmi: string =  getCategory(data)
        const response: Result = {
            height,
            weight,
            bmi
        }
        return response
    }
    catch(error) {
        throw Error(error)
    }
    
}

export { calculateBmi}
