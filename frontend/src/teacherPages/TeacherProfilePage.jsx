import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Mail, CalendarToday, AccountCircle } from '@mui/icons-material';

const TeacherProfilePage = () => {
    const { teacherInfo } = useSelector(store => store.teacherInfo);

    if (!teacherInfo) return <div className="text-center text-gray-600">Loading...</div>;

    // Format Date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(teacherInfo.createdAt));

    return (
        <div className="flex justify-center w-full items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6 rounded-lg">
                <div className="flex flex-col items-center">
                    <Avatar sx={{ width: 80, height: 80, bgcolor: '#3b82f6' }}>
                        <AccountCircle sx={{ fontSize: 60 }} />
                    </Avatar>
                    <h2 className="text-2xl font-bold mt-4">{teacherInfo.name}</h2>
                    <p className="text-gray-500 text-sm">{teacherInfo.role.toUpperCase()}</p>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Mail className="text-blue-500" />
                        <span className="text-gray-700">{teacherInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarToday className="text-green-500" />
                        <span className="text-gray-700">Joined: {formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarToday className="text-green-500" />
                        <span className="text-gray-700">School: {teacherInfo?.schoolId?.schoolName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfilePage;
