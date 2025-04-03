import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
   

    // Calculate percentages
    const attendedPercentage = (data?.attendedLectures / data?.totalLectures) * 100;
    const missedPercentage = 100 - attendedPercentage;

    const chartData = {
        labels: ['Attended Lectures', 'Missed Lectures'],
        datasets: [
            {
                label: 'Attendance',
                data: [attendedPercentage, missedPercentage], // Use percentages here
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toFixed(2)}%`; // Show percentage in tooltip
                    },
                },
            },
        },
    };

    return (

        <div className=' p-2 px-4 rounded-lg border w-full border-gray-300'>
            <h1 className='text-lg font-semibold  text-gray-700 '>{title}</h1>
            <div className=' w-full  '>
                {/* Subject Name */}
                <div className='flex gap-4 h-full '>
                    {/* Pie Chart */}
                    <div className=' '>
                        <Pie data={chartData} options={options} />
                    </div>

                    {/* Table for Lecture Counts */}
                    <div className='w-1/2 flex flex-col items-center justify-center'>
                        <table className='table'>
                            <thead className=''>
                                <tr>
                                    <th className=''>Category</th>
                                    <th className=''>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className=''>Attended Lectures</td>
                                    <td className=''>{data?.attendedLectures}</td>
                                </tr>
                                <tr>
                                    <td className=''>Missed Lectures</td>
                                    <td className=''>{data?.totalLectures - data?.attendedLectures}</td>
                                </tr>
                                <tr>
                                    <td className=''>Total Lectures</td>
                                    <td className=''>{data?.totalLectures}</td>
                                </tr>
                                <tr>
                                    <td className=''>Percentage</td>
                                    <td className=''>{data?.attendancePercentage || data?.percentage}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PieChart;