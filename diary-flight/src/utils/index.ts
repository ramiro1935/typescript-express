import { NewDiaryEntry, Visibility, Weather } from '../../types'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const isWeather = (param: any): param is Weather => {
    return Object.values(Weather).includes(param)
}
const isVisibility = (param: any): param is Visibility => {
    return Object.values(Visibility).includes(param)
}

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) 
      throw new Error('Incorrect or missing commment')
  return comment
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date))
        throw new Error('Incorrect or missing date: '+ date)
    return date
}

const parseWeather = (weather: any) : Weather => {
    if(!weather || !isWeather(weather))
        throw new Error('Incorrect or missing weather' + weather)
    return weather
}

const parseVisibility = (visibility: any): Visibility => {
    if(!visibility || !isVisibility(visibility))
        throw new Error('Incorrect or missing visibility' + visibility)
    return visibility
}

type Fields = {
    date: unknown,
    comment: unknown,
    weather: unknown,
    visibility: unknown
}

const toNewDiaryEntry = (object: Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      comment: parseComment(object.comment),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility)
  }
  

  return newEntry
}

export default toNewDiaryEntry
