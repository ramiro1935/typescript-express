const validateArgs = (args: Array<number>): Array<number> => {
  const argsResult: Array<number> = []
  args.forEach(arg => {
    if (isNaN(Number(arg))) {
      throw new TypeError(`${arg} is not a number`)
    }
    argsResult.push(Number(arg))
  })
  return argsResult
}

const getDescription = (average: number, total: number) :string=> {
    const middle = total / 2
    if(average >= middle && average < total) return "not too bad but could be better"
    if(average < middle) return "too bad"
    return "too good! good job"
}

export interface Result  {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}



export const calculator = (target: number, values: number[] ) => {
    try {
        const newValues: Array<number> = validateArgs(values)
        const quantity = newValues.length
        const total =  newValues.reduce((acc, act) => act+=acc, 0) 
        const average = total / quantity
        const result: Result = {
            periodLength: quantity,
            trainingDays: newValues.reduce((acc,act) => acc += act > 0 ? 1:0,0),
            success: target <= average ? true: false,
            rating: target, 
            ratingDescription: getDescription(average, target),
            target: target,
            average: average
        }
        return result
      } catch (error) {
          throw Error(error)
      }
}