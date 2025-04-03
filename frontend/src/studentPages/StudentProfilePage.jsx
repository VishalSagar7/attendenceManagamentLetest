import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import EmailIcon from '@mui/icons-material/Email'; 
import ClassIcon from '@mui/icons-material/Class'; 
import NumbersIcon from '@mui/icons-material/Numbers'; 
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const StudentProfilePage = () => {
    const { studentInfo } = useSelector(store => store.studentInfo);

    

    return (
        <div className="min-h-screen w-full px-6 py-6 ">
            <h1 className="text-3xl font-bold text-center mb-8">Student Profile</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="flex flex-col items-center space-y-6">
                    
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                        <AccountCircleIcon className="text-white text-6xl" />
                    </div>

                  
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {studentInfo?.name}
                    </h2>

               
                    <div className="w-full space-y-4">
                      
                        <div className="flex items-center space-x-4">
                            <EmailIcon className="text-gray-600" />
                            <p className="text-gray-700">{studentInfo?.email}</p>
                        </div>

                    
                        <div className="flex items-center space-x-4">
                            <ClassIcon className="text-gray-600" />
                            <p className="text-gray-700">Class : {studentInfo?.className}</p>
                        </div>

                        
                        <div className="flex items-center space-x-4">
                            <NumbersIcon className="text-gray-600" />
                            <p className="text-gray-700">Roll Number : {studentInfo?.rollNumber}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <LocalPhoneIcon className="text-gray-600" />
                            <p className="text-gray-700">Phone Number : {studentInfo?.phoneNumber}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-gray-700">School : {studentInfo?.schoolInfo?.schoolName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfilePage;