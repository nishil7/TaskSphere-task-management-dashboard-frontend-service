"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const BusyUsers = () => {
  const [userTasks, setUserTasks] = useState([]);

  
  const fetchUserTasks = async () => {
    const token=Cookies.get('authToken');
    const apiUrl = 'http://localhost:8080/admin/taskManagement/resourceManagement/freeUsersBusyUsers/1';
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
      setUserTasks(data);
    } catch (error) {
      console.error('Failed to fetch user tasks:', error);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">UserName</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Assigned taskID</th>
            <th className="px-4 py-2">Assigned taskName</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((userTask, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">{userTask.userName}</td>
              <td className="px-4 py-2 text-center">{userTask.name}</td>
              <td className="px-4 py-2 text-center">{userTask.tasksID}</td>
              <td className="px-4 py-2 text-center">{userTask.taskName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusyUsers;
