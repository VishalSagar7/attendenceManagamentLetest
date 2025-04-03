import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { addIndividualStudentDetails } from "../store/individualStudentDetailsSlice";
import { useDispatch } from 'react-redux'

const useGetIndividualStudent = (studentId) => {

    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!studentId) return;

        const fetchStudentInfo = async () => {
            try {
                const res = await axiosInstance.post(`/api/teacher/getstudentattendence/${studentId}`);

                if (res?.data?.success) {
                    dispatch(addIndividualStudentDetails(res?.data))
                }
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };


        fetchStudentInfo();


    }, [studentId]);

    return { studentInfo, loading, error };
};

export default useGetIndividualStudent;
