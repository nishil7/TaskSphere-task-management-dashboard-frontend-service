"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const FreeUsers = () => {
  const [users, setUsers] = useState([]);

  // Mock API call function
  const fetchUsers = async () => {
    const token=Cookies.get('authToken');
    const apiUrl = 'http://localhost:8080/admin/taskManagement/resourceManagement/freeUsersBusyUsers/0'; // Update this to your users' endpoint
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
      setUsers(data);
      
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">UserName</th>
            <th className="px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">{user.userName}</td>
              <td className="px-4 py-2 text-center">{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreeUsers;
