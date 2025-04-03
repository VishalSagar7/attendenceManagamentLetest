import React from 'react'
import { useSelector } from 'react-redux';
import useGetIndividualStudent from '../hooks/useGetIndividualStudent';
import IndividualStudentAttendence from '../teacherPages/IndividualStudentAttendence';


const MyAttendencePage = () => {

  const { studentInfo } = useSelector(store => store.studentInfo);

  useGetIndividualStudent(studentInfo?.id)

  return (
    <div className='w-full'>
      <IndividualStudentAttendence />
    </div>
  )
}

export default MyAttendencePage;
