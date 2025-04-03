
import { Outlet } from 'react-router-dom'
import MasterSidebar from '../teacherComponents/MasterSidebar'

const TeacherHome = () => {
  return (
    <div className='flex'>
      <MasterSidebar/>
      <Outlet />
    </div>
  )
}

export default TeacherHome;
