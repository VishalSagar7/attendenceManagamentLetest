import React, { useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addStudentListForGettingAttendence } from '../store/studentListForGettingAttendence';
import { Link } from 'react-router-dom';
import SchoolName from '../teacherComponents/SchoolName';

const GetAttendencePage = () => {
    
    const [className, setClassname] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [gettingList, setGettingList] = useState(false);
    const { studentListForGettingAttendence } = useSelector(store => store.studentListForGettingAttendence);
    const { schoolInfo } = useSelector(store => store.schoolInfo);
    const dispatch = useDispatch();

   
    const getStudentList = async () => {
        if (!className) {
            toast.warning('Enter classname please');
            return;
        }
        setGettingList(true);
        try {
            const res = await axiosInstance.post(`/api/teacher/getallstudents`, { className, schoolId: schoolInfo._id });

            if (res?.data?.success) {
                dispatch(addStudentListForGettingAttendence(res?.data?.allStudents));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            dispatch(addStudentListForGettingAttendence([]));
        } finally {
            setGettingList(false);
        }
    };

    
    const filteredStudents = studentListForGettingAttendence?.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='min-h-screen w-full px-3'>

            <SchoolName />
            
            <div className='flex gap-[80px] py-6 px-4 rounded bg-primary/10 shadow'>
                {/* Classname Input */}
                <div className='form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Enter classname</span>
                    </label>
                    <div className='flex gap-1'>
                        <input
                            value={className}
                            onChange={(e) => setClassname(e.target.value)}
                            type="text"
                            placeholder="e.g 6A"
                            className="input input-bordered max-w-xs"
                        />
                        <button
                            onClick={getStudentList}
                            className="btn btn-primary"
                        >
                            Get student list
                        </button>
                    </div>
                </div>

                {/* Search by Name Input */}
                <div className='form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Search by name</span>
                    </label>
                    <div className='flex gap-1'>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="e.g John Doe"
                            className="input input-bordered max-w-xs"
                        />
                    </div>
                </div>
            </div>

            <hr className='text-gray-200' />

            {/* Loading State */}
            {gettingList ? (
                <div className='w-full h-[calc(100vh-150px)] flex items-center justify-center text-center'>
                    <span className="loading loading-bars loading-xl text-blue-500"></span>
                </div>
            ) : (
                <div className="my-4 mt-8">
                    {/* Table for Displaying Students */}
                    {filteredStudents?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* Table Head */}
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Classname</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student?._id} className="hover:bg-base-200">
                                            <td>{student?.rollNumber}</td>
                                            <td>{student?.name}</td>
                                            <td>{student?.email}</td>
                                            <td>{student?.className}</td>
                                            <td>
                                                <Link
                                                    to={`/individualstudentdata/${student?._id}`}
                                                    className="text-blue-500 hover:underline italic"
                                                >
                                                    show
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                       <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetAttendencePage;