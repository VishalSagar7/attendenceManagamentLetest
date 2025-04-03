import React, { useState } from 'react'
import dayjs from 'dayjs';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'sonner';
import { addStudentsList } from '../store/studentListSlice';
import { useDispatch } from 'react-redux'
import StudentsTable from './StudentsTable';
import { useSelector } from 'react-redux';
import { addClassSubjects } from '../store/classSubjectSlice';
import store from '../store/store';
import SchoolName from './SchoolName';




const StudentList = () => {

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const { studentsList } = useSelector(store => store.studentsList);
    const { classSubjects } = useSelector(store => store.classSubjects);
    const { schoolInfo } = useSelector(store => store.schoolInfo);
    const [subject, setSubject] = useState('');
    const [gettingList, setGettingList] = useState(false);
    const [className, setClassname] = useState("");
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    console.log("schoolInfo", schoolInfo._id);
    

    const getStudentList = async () => {
        if (!className) {
            toast.warning('Enter classname please');
            return;
        }

        setGettingList(true);
        try {
            const res = await axiosInstance.post(`/api/teacher/getallstudents`, { className, schoolId: schoolInfo._id });

            if (res?.data?.success) {
                console.log(res?.data);
                
                dispatch(addStudentsList(res?.data?.allStudents));
                dispatch(addClassSubjects(res?.data?.classSubjects));
            }

        } catch (error) {
            console.log(error);
            dispatch(addStudentsList([]));
            toast.error(error?.response?.data?.message);

        } finally {
            setGettingList(false);
        }
    }

    return (
        <div className='min-h-screen w-full px-3 '>
            <SchoolName/>
            <div className='flex gap-4 justify-between py-6 px-4 rounded bg-primary/10 shadow'>
                <div className='form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Enter className</span>
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
                            className="btn btn-primary "
                        >Get student list
                        </button>
                    </div>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Select Faculty</span>
                    </label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="" disabled>-- Select Faculty --</option>
                        {
                            classSubjects?.map((subject) => {
                                return (
                                    <option value={subject} key={subject}>
                                        { subject }
                                    </option>
                                )
                            })
                        }
                        
                       
            
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Select Date</span>
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>



            <hr className='text-gray-200' />

            

            {
                studentsList?.length > 0 && (
                    <div>
                        <StudentsTable gettingList={gettingList} selectedDate={selectedDate} subject={subject} />
                    </div>
                )
            }


        </div>
    )
}

export default StudentList;
