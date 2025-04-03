import React from 'react'
import { useSelector } from 'react-redux';

const SchoolName = () => {

    const { schoolInfo } = useSelector(store => store.schoolInfo);

    console.log("schoolname", schoolInfo?.schoolName);

    return (
        <div className='pb-1 rounded px-4 py-2 my-2 shadow text-primary/80 font-mono'>

            <h1 className=' text-xl font-semibold'>
                {schoolInfo?.schoolName}
            </h1>

        </div>
    )
}

export default SchoolName;
