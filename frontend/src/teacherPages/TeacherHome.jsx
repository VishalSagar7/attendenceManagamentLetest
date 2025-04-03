
import { Outlet } from 'react-router-dom'
import TeacherSidebar from "../teacherComponents/TeacherSidebar.jsx"

const TeacherHome = () => {
  return (
    <div className='flex'>
      <TeacherSidebar />
      <Outlet />
    </div>
  )
}

export default TeacherHome
