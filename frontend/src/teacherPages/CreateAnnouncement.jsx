import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SchoolName  from "../teacherComponents/SchoolName";

const CreateAnnouncement = () => {
    
    const [className, setClassName] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { teacherInfo } = useSelector(store => store.teacherInfo);
    const { schoolInfo } = useSelector(store => store.schoolInfo);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!className || !content) {
            toast.warning("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Send a POST request to the backend
            const response = await axiosInstance.post("/api/teacher/createannouncement", {
                teacherId: teacherInfo._id,
                className,
                content,
                schoolId : schoolInfo?._id
            });

            // Handle success
            if (response.data.success) {
                toast.success(response?.data?.message);
                setSuccess(true);
                setClassName("");
                setContent("");
            } else {
                setError("Failed to create announcement.");
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message || "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 p-6 w-full m-3 ">
            <h2 className="text-2xl font-bold text-center mb-6">Create Announcement</h2>
            {error && (
                <div className="alert alert-error mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
            {success && (
                <div className="alert alert-success mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Announcement created successfully!</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label" htmlFor="className">
                        <span className="label-text">Announcement for class</span>
                    </label>
                    <input
                        type="text"
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter class name"
                        className="input block input-bordered w-[200px]"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="content">
                        <span className="label-text">Content</span>
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter announcement content"
                        className="textarea textarea-bordered w-full h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`btn w-[200px] btn-primary flex mx-auto ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Announcement"}
                </button>
            </form>
        </div>
    );
};

export default CreateAnnouncement;