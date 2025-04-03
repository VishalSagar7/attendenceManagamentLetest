import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';

const StudentsTable = ({ selectedDate, subject, gettingList }) => {
    const { studentsList } = useSelector(store => store.studentsList);
    const [attendance, setAttendance] = useState({});
    const { teacherInfo } = useSelector(store => store.teacherInfo);
    const [loading, setLoading] = useState(false);

    const handleSubmitAttendance = async () => {
        const studentsData = studentsList.map(student => ({
            studentId: student._id,
            present: attendance[student._id] || false,
        }));

        console.log("Submitting Attendance:", studentsData);
        console.log("selectedDate", selectedDate);
        console.log("subject", subject);

        if (!selectedDate || !subject) {
            toast.warning("Fill the inputs");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/teacher/insertattendence', {
                teacherId: teacherInfo?._id,
                subject,
                date: selectedDate,
                studentsData,
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                setAttendance({});
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleAttendance = (id) => {
        setAttendance((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    if (gettingList) {
        return (
            <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center text-center">
                <span className="loading loading-bars loading-xl text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="my-4 mt-6 rounded-lg">
            {/* DaisyUI Table */}
            <div className="overflow-x-auto ">
                <table className="table w-full rounded">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Classname</th>
                            <th>Present</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {studentsList && studentsList.length > 0 ? (
                            studentsList.map((student) => (
                                <tr key={student?._id} className="hover:bg-base-200">
                                    <td>{student?.rollNumber}</td>
                                    <td>{student?.name}</td>
                                    <td>{student?.email}</td>
                                    <td>{student?.className}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={attendance[student?._id] || false}
                                            onChange={() => toggleAttendance(student?._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (

                                <></>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Submit Button */}
            <div className="w-full h-[100px] flex items-center justify-center">
                <button
                    onClick={handleSubmitAttendance}
                    className="btn btn-primary btn-lg w-[200px]"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        "Submit attendance"
                    )}
                </button>
            </div>
        </div>
    );
};

export default StudentsTable;