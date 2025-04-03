import React from 'react'
import TeacherSidebar from '../teacherComponents/teacherSidebar'
import { Outlet } from 'react-router-dom'

const TeacherHome = () => {
  return (
    <div className='flex'>
      <TeacherSidebar />
      <Outlet/>
    </div>
  )
}

export default TeacherHome
