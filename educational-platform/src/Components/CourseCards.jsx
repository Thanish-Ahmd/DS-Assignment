import React from 'react'
import { GiBookCover } from "react-icons/gi";

const CourseCards = ({ courses,  navigateToEnrollement }) => {
  const data = courses

  const iconColours = [
    {color: 'green', gradient: 'bg-gradient-to-br from-green-300 to-green-600'},
    {color: 'pink', gradient: 'bg-gradient-to-br from-rose-300 to-rose-600'},
    {color: 'teal', gradient: 'bg-gradient-to-br from-teal-300 to-teal-600'},
  ]
  
  return (
    (data.map((course, index) => (
      <div 
        key={course.courseCode}
        // implement a callback function here to navigate to the respective course page once you click the card
        onClick={() => navigateToEnrollement(course)}
        className='flex flex-col px-2 py-2.5 w-[150px] rounded-lg border-slate-300 border shadow-sm cursor-pointer'
      >
        <GiBookCover size={100} color={iconColours[index % iconColours.length].color} className={`self-center w-full rounded-md ${iconColours[index % iconColours.length].gradient} mb-1`}/>
        <div className='text-sm text-slate-500 block'>{course.courseCode} - {course.shortName}</div>
        <div className='text-xs font-semibold truncate'>{course.courseName}</div>
      </div>
    )))
  )
}

export default CourseCards