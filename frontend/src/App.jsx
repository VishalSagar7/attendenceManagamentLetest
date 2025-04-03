import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeacherHome from './TeacherPages/TeacherHome';
import StudentList from './teacherComponents/StudentList';
import TeacherLogin from './teacherPages/TeacherLoginPage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import GetAttendencePage from './teacherPages/GetAttendencePage';
import StudentLoginPage from './studentPages/StudentLoginPage';
import StudentHomePage from './studentPages/StudentHomePage';
import IndividualStudentAttendence from './teacherPages/IndividualStudentAttendence';
import GetDefaulterList from './teacherPages/GetDefaulterList';
import CreateAnnouncement from './teacherPages/CreateAnnouncement';
import StudentSignupPage from './studentPages/StudentSignupPage';
import MyAttendencePage from './studentPages/MyAttendencePage';
import StudentAnnouncementPage from './studentPages/StudentAnnouncementPage';
import StudentProfilePage from './studentPages/StudentProfilePage';
import TeacherProfilePage from './teacherPages/TeacherProfilePage';

const App = () => {

  const { teacherInfo } = useSelector(store => store.teacherInfo);
  const { studentInfo } = useSelector(store => store.studentInfo);
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: teacherInfo ? <TeacherHome /> : <Navigate to='/teacherlogin' />,
      children: [
        {
          path: '/',
          element : <StudentList/>
        },
        {
          path: '/getattendence',
          element: <GetAttendencePage/>
        },
        {
          path: '/individualstudentdata/:id',
          element : <IndividualStudentAttendence/>
        },
        {
          path: '/getdefaulterlist',
          element: <GetDefaulterList/>
        },
        {
          path: '/createannouncement',
          element: <CreateAnnouncement/>
        },
        {
          path: '/teacherprofile',
          element: <TeacherProfilePage/>
        }
      ]
    },
    {
      path: '/teacherlogin',
      element : !teacherInfo ? <TeacherLogin/> : <Navigate to='/'/>
    },
    {
      path: '/studentlogin',
      element: !studentInfo ? <StudentLoginPage /> : <Navigate to='/studenthome'/>
    },
    {
      path: '/studentsignup',
      element: <StudentSignupPage/>
    },
    {
      path: '/studenthome',
      element: studentInfo ? <StudentHomePage /> : <Navigate to='/studentlogin' />,
      children: [
        {
          path: '/studenthome',
          element : <MyAttendencePage/>
        },
        {
          path: '/studenthome/studentannouncement',
          element: <StudentAnnouncementPage/>
        },
        {
          path: '/studenthome/studentprofile',
          element: <StudentProfilePage/>
        }
      ]
    }
  ])
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App;

