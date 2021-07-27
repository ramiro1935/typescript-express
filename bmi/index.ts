import express, { NextFunction, Request, Response } from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculator, Result as CalculatorResult } from './exerciseCalculator'
import { Result as BMIResult } from './bmiCalculator'

const app = express()

app.use(express.json())

// BMI RESPONSE

interface ErrorResponse {
  error: string
}

// DTOS
interface BMIDto {
    weight: number 
    height: number
}

interface CalculatorDto {
    daily_exercises: number[]
    target: number
}

const handleError = (message: string): ErrorResponse => {
  return { error: message } as ErrorResponse
}



const verifyValues = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    if (isNaN(height) || isNaN(weight))
      return res.json(handleError('values should be a positive integer'))
    
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    req.body.height = height
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    req.body.weight = weight
    next()
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.json(handleError(error.message))
    }
  }
}

app.post('/excercises', (req: Request, res: Response) => {
    try {
        const { daily_exercises, target } = req.body as CalculatorDto
        const response: CalculatorResult = calculator(target, daily_exercises)
        return res.json(response)
    }
    catch(error){
        if(error instanceof Error){
            return res.json(handleError(error.message))
        }
        return res.json('error')
    }
}) 


app.get('/:bmi', verifyValues, (req, res) => {
  try {
    const { height, weight } = req.body as BMIDto
    const response: BMIResult = calculateBmi(height, weight)
    return res.json(response)
  } catch (error) {
    if (error instanceof Error) {
      return res.json(handleError(error.message))
    }
    return res.json('error')
  }
})




const PORT = 3003

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
