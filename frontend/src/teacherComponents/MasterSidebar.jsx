import React from 'react'
import { TfiWrite } from "react-icons/tfi";
import { MdOutlineFindInPage } from "react-icons/md";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux'
import { addTeacherInfo } from '../store/teacherSlice';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { addDefaulterList } from '../store/defaultersSlice'
import { addStudentInfo } from '../store/studentSlice';
import { addStudentsList } from '../store/studentListSlice';
import { addStudentListForGettingAttendence } from '../store/studentListForGettingAttendence';
import { addIndividualStudentDetails } from '../store/individualStudentDetailsSlice';
import { addSelectedTab } from '../store/selectedTab';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { addSchoolInfo } from '../store/scoolInfo';
import { addClassSubjects } from '../store/classSubjectSlice';


const MasterSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTab } = useSelector(store => store.selectedTab);


  const sidebarContents = [
    {
      text: "Insert",
      icon: <EditCalendarIcon />

    },
    {
      text: "Get attendence",
      icon: <ArticleIcon />
    },
    {
      text: "Defaulters",
      icon: <FormatListBulletedIcon />
    },
    {
      text: "Announce",
      icon: <CampaignIcon />
    },
    {
      text: "Profile",
      icon: <AccountCircleIcon />
    },
    {
      text: "Logout",
      icon: <LogoutIcon />
    },

  ];

  const handleNavigate = (textWord) => {

    dispatch(addSelectedTab(textWord));

    if (textWord === "Get attendence") {
      navigate('/getattendence');
    }
    else if (textWord === "Insert") {
      navigate('/');
    }
    else if (textWord === "Logout") {
      dispatch(addTeacherInfo(null));
      dispatch(addDefaulterList(null));
      dispatch(addStudentInfo(null));
      dispatch(addStudentsList(null));
      dispatch(addStudentListForGettingAttendence(null));
      dispatch(addIndividualStudentDetails(null));
      dispatch(addSchoolInfo(null));
      dispatch(addClassSubjects([]));
    }
    else if (textWord === "Defaulters") {
      navigate('/getdefaulterlist');
    }
    else if (textWord === "Announce") {
      navigate('/createannouncement');
    }
    else if (textWord === "Profile") {
      navigate('/teacherprofile');
    }
  }

  return (
    <div className=' w-1/6 p-4 p min-h-screen bg-primary/10  rounded  shadow '>
      <div className='h-full w-full flex flex-col gap-2 '>
        {
          sidebarContents?.map((content) => {
            return (
              <div
                onClick={() => handleNavigate(content?.text)}
                key={content?.text}
                className={`flex items-center gap-2 cursor-pointer h-10 rounded px-2 hover:bg-primary/10 hover:text-black ${content.text === selectedTab ? " bg-primary text-white " : ""}`}
              >
                <p>{content?.icon}</p> <span className=''>{content?.text}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MasterSidebar;
