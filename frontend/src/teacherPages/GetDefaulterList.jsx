import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addDefaulterList } from '../store/defaultersSlice';
import { Link } from 'react-router-dom'; 
import SchoolName from '../teacherComponents/SchoolName';

const GetDefaulterList = () => {

    const [className, setClassname] = useState('');
    const { defaulterlist } = useSelector(store => store.defaulterList);
    const { schoolInfo } = useSelector(store => store.schoolInfo);
    console.log("schoolinfo", schoolInfo);
    

    const dispatch = useDispatch();

    const getDefaulterList = async () => {
        console.log("Button clicked");

        try {
            const res = await axiosInstance.post(`/api/teacher/getdefaulterlist`, { className, schoolId:schoolInfo?._id });

            if (res?.data?.success) {
                dispatch(addDefaulterList(res?.data));
            }
        } catch (error) {
            console.error("Error fetching defaulter list:", error);
        } 
    };

    return (
        <div className='min-h-screen w-full px-3'>
            <SchoolName/>
            <div className='flex gap-[80px] py-6 px-4  rounded bg-primary/10 shadow'>
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
                            onClick={getDefaulterList}
                            className="btn btn-primary"
                        >
                            Get defaulter list
                        </button>
                    </div>
                </div>
            </div>

            {/* Table to Display Defaulter List */}
            <div className="my-8">
                <h1 className='text-xl font-semibold text-gray-700 mb-4'>Defaulter List <span className='text-sm text-primary/80'>(overall attendence less than 75%)</span></h1>
                {defaulterlist?.defaulters && defaulterlist?.defaulters?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Class</th>
                                    <th>Attendance %</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {defaulterlist?.defaulters?.map((student, index) => (
                                    <tr key={index} className="hover:bg-base-200">
                                        <td className="">{student?.rollNumber}</td>
                                        <td className="">{student?.name}</td>
                                        <td className="">{student?.email}</td>
                                        <td className="">{student?.className}</td>
                                        <td className="">{student?.percentage}</td>
                                        <td className="">
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
        </div>
    );
};

export default GetDefaulterList;