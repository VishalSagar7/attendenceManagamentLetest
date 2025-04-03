import React from 'react'
import StudentSidebar from '../studentComponents/StudentSidebar';
import { Outlet } from 'react-router-dom';

const StudentHomePage = () => {
  return (
    <div className='flex w-full'>
      <StudentSidebar />
      <Outlet/>
    </div>
  )
}

export default StudentHomePage;
