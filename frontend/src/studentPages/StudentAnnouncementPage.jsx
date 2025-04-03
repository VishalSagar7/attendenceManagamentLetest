import React, { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';
import { addAnnouncements } from '../store/classAnnouncements';
import { useDispatch } from 'react-redux';

const StudentAnnouncementPage = () => {
    
    const { studentInfo } = useSelector(store => store.studentInfo);
    const { classAnnouncements } = useSelector(store => store.classAnnouncements);
    const { schoolInfo } = useSelector(store => store.schoolInfo);
    const dispatch = useDispatch();

    console.log("schoolInfo",studentInfo);
    

    useEffect(() => {
        const getStudentAnnouncements = async () => {
            try {
                const res = await axiosInstance.post(`/api/student/getstudentannouncement`, {
                    className: studentInfo?.className,
                    schoolId: schoolInfo?._id
                });
                if (res?.data?.success) {
                    dispatch(addAnnouncements(res?.data));
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        getStudentAnnouncements();
    }, [dispatch, studentInfo?.className]);

    return (
        <div className="min-h-screen w-full px-6 py-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8">Class Announcements</h1>
            <div className="max-w-4xl mx-auto">
                {classAnnouncements?.announcements?.length > 0 ? (
                    classAnnouncements?.announcements.map((announcement) => (
                        <div key={announcement?._id} className="card bg-gray-100 shadow-lg mb-6">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-semibold">{announcement?.content}</h2>
                                <p className="text-gray-600">
                                    <span className="font-medium">Posted by:</span> {announcement?.createdBy?.name} ({announcement?.createdBy?.email})
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Posted on:</span> {new Date(announcement?.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">For Class:</span> {announcement?.createdForClass}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No announcements available.</p>
                )}
            </div>
        </div>
    );
};

export default StudentAnnouncementPage;