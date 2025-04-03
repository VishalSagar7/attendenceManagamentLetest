import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addStudentInfo } from "../store/studentSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentSignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        className: "",
        rollNumber: "",
        phoneNumber: "",
        schoolname: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
        const [schools, setSchools] = useState([]); 
        const [isSchoolLoading, setIsSchoolLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const navigte = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const fetchSchools = async () => {
        setIsSchoolLoading(true);
        try {
            const res = await axiosInstance.get("/api/school/getallschools");
            if (res?.data?.success) {

                setSchools(res.data.schools);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch schools");
        } finally {
            setIsSchoolLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!formData.name || !formData.email || !formData.password || !formData.className || !formData.rollNumber || !formData.phoneNumber) {
            setError("All fields are required");
            toast.warning('All fields are required');
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post(`/api/student/signup`, formData);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                
                navigte('/studentlogin');
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    className: "",
                    rollNumber: "",
                    phoneNumber: ""
                })
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred during signup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Student Signup</h2>

                {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">School name</label>
                        <select
                            name="schoolname"
                            value={formData.schoolname}
                            onChange={handleChange}
                            onFocus={fetchSchools}
                            className="input input-bordered w-full"
                        >

                            <option value="" disabled className="text-gray-700">
                                {isSchoolLoading ? "Loading schools..." : "--Select--"}
                            </option>

                            {schools.length > 0 &&
                                schools.map((school) => (
                                    <option key={school?._id} value={school?.schoolName}>
                                        {school?.schoolName}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="w-full mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered w-full pr-12"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[50%] transform translate-y-[-50%] text-gray-500 hover:text-gray-700 flex items-center"
                            >
                                {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Class Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Class Name</label>
                        <input
                            type="text"
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter your class name"
                            required
                        />
                    </div>

                    {/* Roll Number Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Roll Number</label>
                        <input
                            type="number"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter your roll number"
                            required
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-md"></span> : "Signup"}
                    </button>

                    <p className="text-sm">Already registered? <Link to={'/studentlogin'} className=" link-primary">click here</Link></p>

                </form>
            </div>
        </div>
    );
};

export default StudentSignupPage;