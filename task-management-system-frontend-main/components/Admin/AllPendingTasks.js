"use client";

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AllPendingTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Mock API call function
  const fetchTasks = async () => {
    const token=Cookies.get('authToken');
    const apiUrl = 'http://localhost:8080/admin/taskManagement/resourceManagement/getAllUnclaimedTasks/3';
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    });
      if (response.status === 401) {
        window.location.href = 'http://localhost:3004/login';
        return;
    }
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
    <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2 w-1/6">TASK_ID</th>
              <th className="px-4 py-2 w-1/6">TASK_NAME</th>
              <th className="px-4 py-2 w-1/6">PRIORITY_ID</th>
              <th className="px-4 py-2 w-1/3">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 w-1/6 text-center">{task.tasksID}</td>
                <td className="px-4 py-2 w-1/6 text-center">{task.taskName}</td>
                <td className="px-4 py-2 w-1/6 text-center">P{task.priorityID}</td>
                <td className="px-4 py-2 w-1/6 text-center">{task.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllPendingTasks;
