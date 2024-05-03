"use client"
import AdminTaskList from '@/components/Admin/AdminTaskList';
import Link from 'next/link';
import React, { useState } from 'react';

function Home() {
    const [filterStatus, setFilterStatus] = useState(0);
    const [filterPriority, setFilterPriority] = useState(0);

    const renderComponent = () => {
        return <AdminTaskList filterStatus={filterStatus} filterPriority={filterPriority} />;
    };

    return (
        <div>
            <div className="bg-gray-100">
                <h1 className="text-center text-3xl font-semibold text-gray-900 mb-10">Hello Admin!</h1>
                <div className='flex items-center justify-center'>
                    <h2 className="mb-3 mr-2"><b>Filters</b></h2>
                    <div className="flex justify-center px-4 mb-4">
                        <select
                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => { 
                                setFilterStatus(e.target.value) 
                                console.log(filterStatus)
                            }}
                            value={filterStatus}
                        >
                            <option value="0">Select Status</option>
                            <option value="1">Available</option>
                            <option value="2">In Progress</option>
                            <option value="3">Pending</option>
                            <option value="4">Done</option>
                        </select>
                    </div>
                    <div className="flex justify-center px-4 mb-4">
                        <select
                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => { setFilterPriority(e.target.value) }}
                            value={filterPriority}
                        >
                            <option value="0">Select Priority</option>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                    </div>

                    {/* Add New Task Button */}
                    <Link
                        href={`/TaskManagement/newTask`}
                    >
                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 ml-2">Add New Task</button>
                    </Link>

                    <Link
                        href={`/TaskManagement/ResourseManagement`}
                    >
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4 ml-3">
                            View Resources
                        </button>
                    </Link>


                </div>

            </div>
            <div>
                {renderComponent()}
            </div>


        </div>
    )
}

export default Home
