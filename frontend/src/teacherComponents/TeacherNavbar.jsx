import React from "react";

const TeacherNavbar = () => {
    return (
        <div className="navbar bg-base-300 shadow-md px-4">
            {/* Left: Logo or Brand Name */}
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl text-primary">
                    Teacher Portal
                </a>
            </div>

            {/* Right: Actions (Notifications + Profile) */}
            <div className="flex-none gap-4">


                {/* Profile Avatar Dropdown */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placehold.co/50x50" alt="Profile" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Profile</a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeacherNavbar;
