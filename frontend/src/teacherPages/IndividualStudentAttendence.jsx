import React from 'react';
import useGetIndividualStudent from '../hooks/useGetIndividualStudent';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PieChart from '../charts/PieChart';


const IndividualStudentAttendence = () => {

    const { individualStudentDetails } = useSelector(store => store.individualStudentDetail);

    const { id } = useParams();

    useGetIndividualStudent(id);


    if (!individualStudentDetails) {
        return (
            <div className='min-h-screen w-full px-6 py-6 flex items-center justify-center'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        )
    }

    
    

    return (
        <div className='min-h-screen w-full px-6 py-6'>
            
            <div className='flex gap-4 w-full h-[150px]  rounded'>
                <div className='h-full w-[130px] p-2 border-r border-gray-300'>
                    <img
                        className='h-full object-center object-cover w-full'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
                        alt="person image"
                    />
                </div>
                <div className='p-2 flex gap-1 flex-col justify-center '>
                    <div className='flex items-center gap-2'>
                        <PersonIcon sx={{ fontSize: '25px' }} />
                        <span className='text-lg text-gray-800'>{individualStudentDetails?.student?.name} ({individualStudentDetails?.student?.rollNumber})</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ClassIcon sx={{ fontSize: '25px' }} />
                        <span className='text-md text-gray-800'>{individualStudentDetails?.student?.className}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <EmailIcon sx={{ fontSize: '25px' }} />
                        <span className='text-md text-gray-800'>{individualStudentDetails?.student?.email}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <LocalPhoneIcon sx={{ fontSize: '25px' }} />
                        <span className='text-md text-gray-800'>{individualStudentDetails?.student?.phoneNumber}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-md text-gray-800'>School : {individualStudentDetails?.student?.SchoolId?.schoolName}</span>
                    </div>
                </div>
            </div>

            <hr className='mt-2 text-gray-300' />

            {/* Attendance Details Section */}
            <div className='my-4 w-full mt-6'>
                <h1 className='text-xl font-semibold text-gray-700'>Attendance Details</h1>

                {/* Overall Attendance Pie Chart */}
                <div className=' my-2 w-full'>
                    <div className='w-full '>
                        <PieChart data={individualStudentDetails?.overallAttendance} title="Overall Attendance" />
                    </div>
                </div>

                {/* Subject-wise Attendance Pie Charts */}
                <div className='my-6 w-full'>

                    <div className=' w-full flex gap-2 flex-wrap '>
                        {individualStudentDetails?.subjectWiseAttendance?.map((subject, index) => (
                            <div key={index} className='w-[48%]'>
                                <PieChart data={subject} title={subject.subject} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualStudentAttendence;