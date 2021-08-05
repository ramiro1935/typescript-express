import React from 'react'
import { CoursePart } from './types'
const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is the leisured course part',
    type: 'normal',
  },
  {
    name: 'Advanced',
    exerciseCount: 7,
    description: 'This is the harded course part',
    type: 'normal',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    type: 'groupProject',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    type: 'submission',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    type: 'special',
  },
]

interface ContentProps {
  courses: CoursePart[]
}



const PartHeader = ({ title }: { title: string }) => <h4>{title} </h4>

const PartDescription = ({
  text,
  secondaryText,
}: {
  text: string
  secondaryText?: string
}) => (
  <>
    <i>{text}</i>
    <p>{secondaryText}</p>
  </>
)

const PartContainer = ({
  text,
  secondaryText,
  title,
}: {
  text: string
  secondaryText?: string
  title: string
}) => {
  return (
    <div>
      <PartHeader title={title} />
      <PartDescription text={text} secondaryText={secondaryText} />
    </div>
  )
}

const Part = ({ course }: { course: CoursePart }): JSX.Element => {
  switch (course.type) {
    case 'normal':
      return (
        <PartContainer
          title={`${course.name} ${course.exerciseCount}`}
          text={course.description}
        />
      )
    case 'groupProject':
      return (
        <PartContainer
          title={`${course.name} ${course.exerciseCount}`}
          text={`project exercises ${course.groupProjectCount}`}
        />
      )

    case 'submission':
      return (
        <PartContainer
          title={`${course.name} ${course.exerciseCount}`}
          text={course.exerciseSubmissionLink}
        />
      )

    case 'special':
      return (
        <PartContainer
          title={`${course.name} ${course.exerciseCount}`}
          text={course.description}
          secondaryText={`required skills: ${course.requirements.join(', ')}`}
        />
      )
    default:
      return <></>
  }
}

const Header = ({ title }: { title: string }) => <h1>{title}</h1>
const Content = ({ courses }: ContentProps) => (
  <div>
    {courses.map(c => (
      <Part key={c.name} course={c} />
    ))}
  </div>
)
const Total = ({ total }: { total: number }) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const courseName = 'Half Stack application development'
  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  )
  return (
    <div>
      <Header title={courseName} />
      <Content courses={courseParts} />
      <Total total={total} />
    </div>
  )
}

export default App
